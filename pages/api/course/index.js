import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";
import slugify from "slugify";
import Course from "@/models/Course";

const handler = nc();

handler.get(async (req, res) => {
  try {
    let cached = await redisClient.get("courses");
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const courses = await Course.find({});
      await redisClient.setex("courses", 3600, JSON.stringify(courses));
      res.status(200).json(courses);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

handler.use(isAuth, isAdmin);
// only admin can create this
handler.post(async (req, res) => {
  try {
    const { title, image, description, program } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    await db.connect();
    const newCourse = await new Course({
      title,
      image,
      description,
      program,
      slug: slugify(title),
    });
    await newCourse.save();

    let cached = await redisClient.get("courses");
    if (cached) {
      await redisClient.setex(
        "courses",
        3600,
        JSON.stringify([...cached, newCourse])
      );
    }

    res.status(201).json(newCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed To create" });
  }
});



handler.delete(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: "id must be provided" });
    }
    await db.connect();
    await Course.findByIdAndDelete(id);
    await db.disconnect();
    let cached = await redisClient.get("courses");
    if (cached) {
      await redisClient.setex(
        "courses",
        3600,
        JSON.stringify(cached.filter((item) => item._id != id))
      );
    }
    return res.status(201).json({ message: "Succesfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed To Delete" });
  }
});
export default handler;
