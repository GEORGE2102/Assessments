import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
  },
  { timestamps: true },
);

export const Post = mongoose.model("posts", postSchema);
