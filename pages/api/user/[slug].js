import User from "@/models/User";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ slug: req.query.slug });
    await db.disconnect();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

handler.put(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOneAndUpdate(
      { slug: req.query.slug },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    await db.disconnect();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

export default handler;
