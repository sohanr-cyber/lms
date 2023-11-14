import mongoose from "mongoose";

const contentschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "Content", // Reference to the User model (instructor)
      required: true,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    pdf: {
      type: String,
    },
  },
  { timestamps: true }
);

const Content =
  mongoose.models.Content || mongoose.model("Content", contentschema);
export default Content;
