import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";

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
      const divisions = await Division.findOne({ slug });
      await redisClient.setex(slug, 3600, JSON.stringify(divisions));
      res.status(200).json(divisions);
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
    const updated = await Division.findOneAndUpdate(
      { slug },
      { $set: req.body },
      { new: true }
    );

    let cached = await redisClient.get(slug);
    if (cached) {
      await redisClient.setex(slug, 3600, JSON.stringify(updated));
      let divisions = await redisClient.get("divisions");
      if (divisions) {
        const indexToUpdate = divisions.findIndex(
          (obj) => obj._id == updated._id
        );
        console.log(indexToUpdate);
        divisions[indexToUpdate] = updated;
        await redisClient.setex("divisions", 3600, JSON.stringify(divisions));
      }
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
