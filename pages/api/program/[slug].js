import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";
import slugify from "slugify";
import User from "@/models/User";
import Division from "@/models/Division";
const handler = nc();

// get one by slug
handler.get(async (req, res) => {
  try {
    const slug = req.query.slug;
    let cached = await redisClient.get(`program:${slug}`);
    console.log({ cached });
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const program = await Program.findOne({ slug })
        .populate({
          path: "division",
          select: "title _id",
          model: Division,
        })
        .populate({
          path: "instructors",
          select: "name image rank",
          model: User,
        });
      await redisClient.setex(`program:${slug}`, 3600, JSON.stringify(program));
      res.status(200).json(program);
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
    const updated = await Program.findOneAndUpdate(
      { slug },
      { $set: { ...req.body, slug: slugify(req.body.title) } },
      { new: true }
    );

    let cached = await redisClient.get(slug);
    if (cached) {
      await redisClient.setex(slug, 3600, JSON.stringify(updated));
    }

    let programs = await redisClient.get("programs");
    if (programs) {
      const indexToUpdate = programs.findIndex((obj) => obj._id == updated._id);
      console.log(indexToUpdate);
      programs[indexToUpdate] = updated;
      await redisClient.setex("programs", 3600, JSON.stringify(programs));
    }
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// add memeber to a program
handler.post(async (req, res) => {
  try {
    const slug = req.query.slug;
    await db.connect();
    const updated = await Program.findOneAndUpdate(
      { slug },
      {
        $set: {
          instructors: req.body.instructors,
        },
      },
      {
        new: true,
      }
    );

    const program = await Program.findOne({ slug })
      .populate({
        path: "division",
        select: "title _id",
        model: Division,
      })
      .populate({
        path: "instructors",
        select: "name image rank",
        model: User,
      });

    let cached = await redisClient.get(`program:${slug}`);
    if (cached) {
      await redisClient.setex(`program:${slug}`, 3600, JSON.stringify(program));
    }
    console.log(program);
    res.status(200).send(program.instructors);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default handler;
