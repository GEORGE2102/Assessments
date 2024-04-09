import { Post } from "../models/blog.js";
import mongoose from "mongoose";

async function createPost(req, res) {
  try {
    const blog = await Post.create({ ...req.body });
    res.status(201).send({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Post creation unsuccessful. An error occurred on the server.",
      error,
    });
  }
}

async function getAllPosts(req, res) {
  try {
    const authorPosts = await Post.find({
      authorId: new mongoose.Types.ObjectId(req.user.id),
    });

    res.json({ posts: authorPosts });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}

async function getOnePost(req, res) {
  try {
    const authorId = req.user.id;
    const { id: postId } = req.params;
    console.log({ authorId, postId });
    const post = await Post.findOne({
      _id: new mongoose.Types.ObjectId(postId),
      authorId: new mongoose.Types.ObjectId(authorId),
    });

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}

async function updatePost(req, res) {
  try {
    const authorId = req.user.id;
    const { id: postId } = req.params;
    const result = await Post.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(postId),
        authorId: new mongoose.Types.ObjectId(authorId),
      },
      { ...req.body },
      { new: true },
    );

    return res.json({ post: result });
  } catch (error) {
    console.error(error);
  }
}

async function deletePost(req, res) {
  try {
    const authorId = req.user.id;
    const { id: postId } = req.params;
    const result = await Post.findOneAndDelete(
      {
        _id: new mongoose.Types.ObjectId(postId),
        authorId: new mongoose.Types.ObjectId(authorId),
      },
      { ...req.body },
    );

    if (!result) {
      res.status(400).json({ message: "Unauthorized request" });
    }

    return res.json({ post: result });
  } catch (error) {
    console.error(error);
  }
}

export { createPost, getOnePost, getAllPosts, updatePost, deletePost };
