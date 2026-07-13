import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, default: "General", trim: true },
    favorite: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
