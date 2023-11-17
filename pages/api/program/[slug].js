import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";

const handler = nc();

// get one by slug
handler.get(async (req, res) => {
  try {
    const slug = req.query.slug;
    let cached = await redisClient.get(slug);
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const programs = await Program.findOne({ slug }).populate({
        path: "division",
        select: "title _id", // Select only title and _id of the 'division' field
      });
      await redisClient.setex(slug, 3600, JSON.stringify(programs));
      res.status(200).json(programs);
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
      { $set: req.body },
      { new: true }
    );

    let cached = await redisClient.get(slug);
    if (cached) {
      await redisClient.setex(slug, 3600, JSON.stringify(updated));
      let programs = await redisClient.get("programs");
      if (programs) {
        const indexToUpdate = programs.findIndex(
          (obj) => obj._id == updated._id
        );
        console.log(indexToUpdate);
        programs[indexToUpdate] = updated;
        await redisClient.setex("programs", 3600, JSON.stringify(programs));
      }
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
