import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";
import slugify from "slugify";

const handler = nc();

handler.get(async (req, res) => {
  console.log("programmmmmmmmmmmmm");
  try {
    let cached = await redisClient.get("programs");
    if (cached) {
      res.status(200).json(cached);
    } else {
      await db.connect();
      const all = await Program.find({});
      await redisClient.setex("programs", 3600, JSON.stringify(all));
      res.status(200).json(all);
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
    const { title, image, description, divisionID } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    await db.connect();
    const newProgram = await new Program({
      title,
      image,
      description,
      division: divisionID,
      slug: slugify(title),
    });
    await newProgram.save();

    let cached = await redisClient.get("programs");
    if (cached) {
      await redisClient.setex(
        "programs",
        3600,
        JSON.stringify([...cached, newProgram])
      );
    }

    res.status(201).json(newProgram);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed To create" });
  }
});

export default handler;
