import Course from "@/models/Course";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import slugify from "slugify";

const handler = nc();

handler.get(async (req, res) => {
  try {
    const slug = req.query.slug;
    let cached = await redisClient.get(slug);
    if (cached) {
      //   const divisions = JSON.parse(cachedDivisions);
      //   console.log(cached);
      res.status(200).json(cached);
    } else {
      await db.connect();
      const courses = await Course.findOne({ slug }).populate({
        path: "program",
        select: "_id title",
      });
      await redisClient.setex(slug, 3600, JSON.stringify(courses));
      res.status(200).json(courses);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

handler.use(isAuth, isAdmin);
handler.put(async (req, res) => {
  try {
    const slug = req.query.slug;
    await db.connect();
    const updated = await Course.findOneAndUpdate(
      { slug },
      { $set: { ...req.body, slug: slugify(req.body.title) } },
      { new: true }
    );

    //update single course
    let cached = await redisClient.get(slug);
    if (cached) {
      await redisClient.setex(slug, 3600, JSON.stringify(updated));
    }

    // update from all courses
    let courses = await redisClient.get("courses");
    if (courses) {
      const indexToUpdate = courses.findIndex((obj) => obj._id == updated._id);
      console.log(indexToUpdate);
      courses[indexToUpdate] = updated;
      await redisClient.setex("courses", 3600, JSON.stringify(courses));
    }

    // update from courses of a program
    let coursesOfProgram = await redisClient.get(
      `coursesOfProgram:${updated.program}`
    );
    if (coursesOfProgram) {
      const indexToUpdate = coursesOfProgram.findIndex(
        (obj) => obj._id == updated._id
      );
      console.log(indexToUpdate);
      coursesOfProgram[indexToUpdate] = updated;
      await redisClient.setex(
        `coursesOfProgram:${updated.program}`,
        3600,
        JSON.stringify(coursesOfProgram)
      );
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
