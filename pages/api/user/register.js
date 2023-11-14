import nc from "next-connect";
import User from "@/models/User";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";
import slugify from "slugify";
const handler = nc();

// Create User

handler.post(async (req, res) => {
  try {
    const { name, email, pic, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    await db.connect();

    const newUser = await new User({
      name,
      email,
      pic,
      password: hash,
      slug: slugify(name),
    });

    const user = await newUser.save();
    const { hashpassword, ...other } = user;
    await db.disconnect();
    const token = signToken(user);
    res.status(200).send({ user: other._doc, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

export default handler;
