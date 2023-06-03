import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notes", noteSchema);