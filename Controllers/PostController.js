import User from '../Schemas/user.js';
import Post from './../Schemas/post.js';


export const createPost = async (req, res) => {
	console.log(req.body)
	try {
		const { userId, desc, postUrl } = req.body
		console.log({ userId, desc, postUrl })
		const user = await User.findById(userId)
		console.log(user)
		if (!user) {
			return res.status(500).json("Invalid user")
		}

		const { firstName, lastName, location, userUrl, } = user

		const postDoc = new Post({
			userId,
			firstName: firstName,
			lastName: lastName,
			location: location,
			desc,
			postUrl,
			userUrl: userUrl,
			likes: {},
			comments: []
		})

		await postDoc.save()

		const posts = await Post.find().sort({ createdAt: -1 })


		res.status(201).json(posts)
	} catch (err) {
		return res.status(409).json({ err: err.message })
	}
}

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find()
		res.status(200).json(posts)
	} catch (err) {
		return res.status(409).json({ err: err.message })
	}
}


export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params
		const posts = await Post.find({ userId })
		res.status(200).json(posts)
	} catch (err) {
		return res.status(404).json({ err: err.message })
	}
}


export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id)
		const isLiked = post.likes.get(userId)
		if (isLiked) {
			post.likes.delete(userId)
		} else {
			post.likes.set(userId, true)
		}

		const updatePost = await Post.findByIdAndUpdate(id, {
			likes: post.likes
		}, { new: true })

		res.status(200).json(updatePost)
	} catch (err) {
		return res.status(400).json({ err: err.message })
	}
}