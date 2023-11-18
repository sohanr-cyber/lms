import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";
import slugify from "slugify";
import Course from "@/models/Course";
import Content from "@/models/Content";

const handler = nc();

// get all the contents of a course
handler.get(async (req, res) => {
  try {
    const key = `contentsOfCourse:${req.query.course}`;
    let cached = await redisClient.get(key);
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const courses = await Content.find({ course: req.query.course });
      await db.disconnect();
      await redisClient.setex(key, 3600, JSON.stringify(courses));
      res.status(200).json(courses);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
