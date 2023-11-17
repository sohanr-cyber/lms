import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";

const handler = nc();

// get many by division

handler.get(async (req, res) => {
  try {
    const id = req.query.division;
    const key = `program:${id}`;
    let cached = await redisClient.get(key);
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const programs = await Program.find({ devision: id });
      await redisClient.setex(key, 3600, JSON.stringify(programs));
      res.status(200).json(programs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
