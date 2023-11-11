import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Division =
  mongoose.models.Division || mongoose.model("Division", divisionSchema);
export default Division;
