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

handler.get(async (req, res) => {
  try {
    const key = `contentOfCourse:${req.query.contentId}`;
    let cached = await redisClient.get(key);
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const content = await Content.findOne({
        _id: req.query.contentId,
      });
      await redisClient.setex(key, 3600, JSON.stringify(content));
      res.status(200).json(content);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

handler.put(async (req, res) => {
  try {
    const key = `contentOfCourse:${req.query.contentId}`;
    await db.connect();
    const updated = await Content.findOneAndUpdate(
      {
        _id: req.query.contentId,
      },
      { $set: { ...req.body, slug: slugify(req.body.title) } },
      { new: true }
    );

    res.status(200).json(updated);

    let cached = await redisClient.get(key);
    let contents = await redisClient.get(`contentsOfCourse:${updated.course}`);

    if (cached) {
      await redisClient.setex(key, 3600, JSON.stringify(updated));
    }
    // console.log(contents.findIndex((item) => item._id == updated._id));

    if (contents) {
      const indexToUpdate = contents.findIndex(
        (obj) => obj._id == req.query.contentId
      );
      console.log(contents[indexToUpdate]);
      contents[indexToUpdate] = updated;
      console.log(contents[indexToUpdate]);

      await redisClient.setex(
        `contentsOfCourse:${updated.course}`,
        3600,
        JSON.stringify(contents)
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
