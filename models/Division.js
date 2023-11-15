import mongoose from "mongoose";
import slugify from "slugify";
const defaultImage = "https://cdn-icons-png.flaticon.com/128/7688/7688675.png";

const divisionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: defaultImage,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from the title before saving
divisionSchema.pre("save", async function (next) {
  // 'this' refers to the document being saved
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

const Division =
  mongoose.models.Division || mongoose.model("Division", divisionSchema);
export default Division;
