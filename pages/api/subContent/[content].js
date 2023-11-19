import SubContent from "@/models/SubContent";
import { isAdmin, isAuth } from "@/utils/auth";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const content = req.query.content;
  try {
    const subContents = await SubContent.find({ content: content });
    res.status(200).json(subContents);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

handler.use(isAuth, isAdmin);
// create subcontent by content
handler.post(async (req, res) => {
  const content = req.query.content;
  const { title, link } = req.body;

  try {
    const subContents = await SubContent.create({ content: content, title });
    res.status(200).json(subContents);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default handler;
