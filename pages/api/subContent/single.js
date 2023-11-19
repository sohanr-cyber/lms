import SubContent from "@/models/SubContent";
import { isAdmin, isAuth } from "@/utils/auth";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const id = req.query.subContentId;
  try {
    await db.connect();
    const subContent = await SubContent.findOne({ _id: id });
    res.status(200).json(subContent);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

handler.use(isAuth, isAdmin);
// create subcontent by content
handler.put(async (req, res) => {
  const id = req.query.subContentId;
  const { title, link } = req.body;

  try {
    await db.connect();
    const subContents = await SubContent.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          title,
          link,
        },
      },
      { new: true }
    );
    res.status(200).json(subContents);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

handler.delete(async (req, res) => {
  try {
    const id = req.query.subContentId;
    const course = req.query.course;
    await db.connect();
    await SubContent.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "Succesfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
export default handler;
