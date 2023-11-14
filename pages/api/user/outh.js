import nc from "next-connect";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import User from "@/models/User";
const handler = nc();
const redirectURL = "http://localhost:3000";
import db from "@/utils/db";
import slugify from "slugify";
import { signToken } from "@/utils/auth";

handler.post(async (req, res) => {
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
      prompt: "consent",
    });

    console.log(authorizeUrl);

    res.json({ url: authorizeUrl });
  } catch (error) {
    console.log(error);
  }
});

async function getUserData(access_token) {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    return data;
  } catch (error) {
    console.error("Error retrieving user data from Google:", error);
    throw new Error("Failed to retrieve user data");
  }
}

handler.get(async (req, res) => {
  const code = req.query.code;

  console.log(code);

  try {
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    const user = oAuth2Client.credentials;
    const data = await getUserData(user?.access_token);
    const name = data.name;
    const email = data.email;
    const image = data.picture;
    const locale = data.locale;

    await db.connect();

    const existingUser = await User.findOne({ email }).maxTimeMS(30000);

    if (existingUser) {
      const token = signToken(existingUser);
      const { hashpassword, ...other } = existingUser;
      res.status(200).send({ user: other._doc, token });
    } else {
      const result = await User.create({
        verified: "true",
        email,
        name,
        image,
        slug: slugify(name),
      });

      await db.disconnect();

      const token = signToken(result);
      const { hashpassword, ...other } = result;
      res.status(200).send({ user: other._doc, token });
    }
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
