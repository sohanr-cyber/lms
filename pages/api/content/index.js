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

// get all the content
handler.get(async (req, res) => {
  try {
    let cached = await redisClient.get("contents");
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const courses = await Content.find({});
      await redisClient.setex("contents", 3600, JSON.stringify(courses));
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
    const { title, course, description } = req.body;
    const key = `contentOfCourse:${req.body.course}`;
    const key2 = `contentsOfCourse:${req.body.course}`;

    if (!title || !course) {
      return res.status(400).json({ error: "Title and course are required" });
    }
    await db.connect();
    const newContent = await new Content({
      title,
      description,
      slug: slugify(title),
      course,
    });
    await newContent.save();
    res.status(201).json(newContent);

    let cached = await redisClient.get("contents");
    if (cached) {
      await redisClient.setex(
        "contents",
        3600,
        JSON.stringify([...cached, newContent])
      );
    }

    let cachedkey = await redisClient.get(key);
    if (cachedkey) {
      await redisClient.setex(key, 3600, JSON.stringify(newContent));
    }

    let cachedkey2 = await redisClient.get(key2);
    if (cachedkey2) {
      await redisClient.setex(
        key2,
        3600,
        JSON.stringify([...cachedkey2, newContent])
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed To create" });
  }
});

// delete a content
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

// update a content

export default handler;
