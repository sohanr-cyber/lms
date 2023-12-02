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
    const slug = req.query.slug;
    await db.connect();
    const program = await Program.findOne({ slug: slug });
    let cached = await redisClient.get(`coursesOfProgram:${program._id}`);
    if (cached) {
      res.status(200).json(cached);
    } else {
      const courses = await Course.find({ program: program._id });
      await redisClient.setex(
        `coursesOfProgram:${program._id}`,
        3600,
        JSON.stringify(courses)
      );
      res.status(200).json(courses);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
