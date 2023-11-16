import Division from "@/models/Division";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";
import redisClient from "@/utils/redis";

const handler = nc();

handler.get(async (req, res) => {
  try {
    const cachedDivisions = await redisClient.get("divisions");
    if (cachedDivisions) {
      //   const divisions = JSON.parse(cachedDivisions);
      res.status(200).json(cachedDivisions);
    } else {
      await db.connect();
      const divisions = await Division.find({});
      await redisClient.setex("divisions", 3600, JSON.stringify(divisions));
      res.status(200).json(divisions);
    
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
    const { title, image, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    await db.connect();
    const newDivision = await new Division({
      title,
      image,
      description,
    });
    await newDivision.save();
    let cached = await redisClient.get("divisions");
    if (cached) {
      await redisClient.setex(
        "divisions",
        3600,
        JSON.stringify([...cached, newDivision])
      );
    }
    return res.status(201).json({ division: newDivision });
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
    let cached = await redisClient.get("divisions");
    if (cached) {
      await redisClient.setex(
        "divisions",
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
