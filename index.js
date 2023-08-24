import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dovenv from "dotenv";
import morgan from "morgan";
import multer from "multer"
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import AuthRouter from "./Routers/AuthRouter.js"
import { register } from "./Controllers/AuthController.js";
import UserRouter from "./Routers/UserRouter.js";
import { createPost } from "./Controllers/PostController.js";
import PostRouter from './Routers/PostRouter.js';

//CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dovenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "/assets")))



const PORT = process.env.PORT || 6001;
const MONGO_URL = "mongodb://127.0.0.1:27017/MySocial"


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { type } = req.body
		const dir = type === "user" ? "userImg" : "postImg"
		cb(null, `/assets/${dir}`)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage })

app.post("/upload", upload.single("picture"), (req, res) => {
	const { type } = req.body
	const { filename } = req.file
	imgUrl = `assets/${type === "user" ? "userImg" : "postImg"}/${filename}`
})

app.use("/posts", PostRouter)
app.use("/auth", AuthRouter)
app.use("/user", UserRouter)


mongoose.connect(MONGO_URL).then(() => {
	app.listen(PORT, (err) => {

		err ? console.log(`Connection has Error ${err}`) : console.log(`Server run: ${PORT}`)
	})
})