import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division", // Reference to the User model (instructor)
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    instructor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model (instructor)
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Program =
  mongoose.models.Program || mongoose.model("Program", courseSchema);
export default Program;
