import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  updatePost,
} from "../handlers/blog.js";

const blogRouter = Router();

blogRouter.post("/blogs", createPost);

blogRouter.get("/blogs/:id", getOnePost);

blogRouter.get("/blogs", getAllPosts);

blogRouter.patch("/blogs/:id", updatePost);

blogRouter.delete("/blogs/:id", deletePost);

export default blogRouter;
