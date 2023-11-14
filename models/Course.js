import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    program: {
      type: Schema.Types.ObjectId,
      ref: "Program", // Reference to the User model (instructor)
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
    isPopular: {
      type: Boolean,
      default: false,
    },
    isRecomended: {
      type: Boolean,
      default: false,
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

const Course = mongoose.models.Course || mongoose.model("User", courseSchema);
export default Course;
