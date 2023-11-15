import mongoose from "mongoose";
const validRoles = ["student", "instructor", "admin"];
const defaultImage = "https://cdn-icons-png.flaticon.com/128/7688/7688675.png";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      required: true,
      default: "student",
      enum: validRoles,
    },
    image: {
      type: String,
      default: defaultImage,
    },
    rank: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
