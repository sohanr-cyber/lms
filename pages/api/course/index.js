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
      console.log({ courses });
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
    const { title, image, description, programID } = req.body;
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
      program: programID,
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



export default handler;
