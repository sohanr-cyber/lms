import mongoose from "mongoose";

const subContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {},

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const SubContent =
  mongoose.models.SubContent || mongoose.model("SubContent", subContentSchema);
export default SubContent;
