import User from "@/models/User";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

handler.delete(async (req, res) => {
  try {
    await db.connect();
    const result = await User.findOneAndDelete({ _id: req.query.id });
    await db.disconnect();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

export default handler;
