import mongoose from "mongoose";

const subContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content", // Reference to the User model (instructor)
      required: true,
    },

    description: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const SubContent =
  mongoose.models.SubContent || mongoose.model("SubContent", subContentSchema);
export default SubContent;
