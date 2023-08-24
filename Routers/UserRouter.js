import express from "express"
import { verifyToken } from './../middleware/verifyToken.js';
import { addRemoveFriend, getUser, getUserFriend } from "../Controllers/UserController.js";

const UserRouter = express.Router()

UserRouter.get("/:id", verifyToken, getUser)
UserRouter.get("/:id/friend", verifyToken, getUserFriend)
UserRouter.get("/:id/:friendId", verifyToken, addRemoveFriend)

export default UserRouter