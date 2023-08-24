import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost, getPosts, getUserPosts, likePost } from "../Controllers/PostController.js";

const PostRouter = express.Router()

PostRouter.get("/", verifyToken, getPosts)
PostRouter.get("/:userId", verifyToken, getUserPosts)

PostRouter.post("/", verifyToken, createPost)

PostRouter.patch("/:id/like", verifyToken, likePost)


export default PostRouter