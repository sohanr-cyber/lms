import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";
import Program from "@/models/Program";
import slugify from "slugify";

const handler = nc();

handler.get(async (req, res) => {
  try {
    const key = "programs";
    const cached = await redisClient.get(key);
    if (cached) {
      //   const divisions = JSON.parse(cachedDivisions);
      res.status(200).json(cached);
    } else {
      await db.connect();
      const programs = await Program.find({}).populate({
        path: "division",
        select: "title _id", // Select only title and _id of the 'division' field
      });
      await redisClient.setex(key, 3600, JSON.stringify(programs));
      res.status(200).json(programs);
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
    const { title, image, description, division } = req.body;
    if (!title || !division) {
      return res.status(400).json({ error: "Title and division are required" });
    }
    await db.connect();
    const newProgram = await new Program({
      title,
      image,
      description,
      division,
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
    return res.status(201).json(newProgram);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed To create" });
  }
});

handler.delete(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: "id must be provided" });
    }
    await db.connect();
    await Division.findByIdAndDelete(id);
    await db.disconnect();
    let cached = await redisClient.get("programs");
    if (cached) {
      await redisClient.setex(
        "programs",
        3600,
        JSON.stringify(cached.filter((item) => item._id != id))
      );
    }
    return res.status(201).json({ message: "Succesfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed To create" });
  }
});

export default handler;
