import JWT from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
	let token = req.header("Authorization")
	console.log(token)
	try {
		if (!token) {
			return res.status(403).json({ msg: "Access Denied" })
		}
		if (token.startsWith("Bearer")) {
			token = token.slice(7, token.length).trimLeft()
		}

		const verified = JWT.verify(token, process.env.JWT_SECRET_KEY)

		req.user = verified
		next()

	} catch (err) {
		console.log(err)
		return res.status(500).json({ err: err.message })
	}
}