import bcrypt from "bcrypt";
import User from "../Schemas/user.js";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			userUrl,
			location,
			occupation,
		} = req.body

		const passHash = req.body.password
		const salt = await bcrypt.genSalt(13)
		const passwordHash = await bcrypt.hash(passHash, salt)

		const userDoc = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			userUrl,
			location,
			occupation,
		})

		if (!userDoc) {
			return res.status(500).json({ err: "Something wents wrong..." })
		}

		const savedUser = await userDoc.save()

		const { password, ...userData } = savedUser._doc

		res.status(201).json({ ...userData })
	} catch (err) {
		if (err.keyPattern?.email > 0) {
			return res.status(400).json({ msg: "Email is already exist" })
		}
		return res.status(500).json({ msg: "Something wents wrong..." })
	}
}


export const login = async (req, res) => {
	const { email } = req.body
	const incomingPassword = req.body.password
	try {
		const user = await User.findOne({ email: email })
		if (!user) {
			return res.status(404).json({ err: err.message })
		}
		const validPassword = bcrypt.compare(user.password, incomingPassword)
		if (!validPassword) {
			return res.status(404).json({ err: err.message })
		}

		const token = JWT.sign(
			{
				id: user._id
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "1d" }
		)

		const { password, ...userData } = user._doc

		res.status(200).json({ ...userData, token })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ msg: "Something wents wrong..." })
	}
}