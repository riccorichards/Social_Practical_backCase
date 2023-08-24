import User from "../Schemas/user.js"

export const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id)
		res.status(200).json(user)
	} catch (err) {
		return res.status(400).json({ err: err.message })
	}
}


export const getUserFriend = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id)

		const friends = await Promise.all(
			user.friends.map(id => User.findById(id))
		)
		const formattedFriend = friends.map(
			({ _id, firstName, lastName, uccupation, location, pictureUrl }) => {
				return { _id, firstName, lastName, uccupation, location, pictureUrl }
			}
		)
		res.status(200).json(formattedFriend)
	} catch (err) {
		return res.status(400).json({ err: err.message })
	}
}

export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params
		const user = await User.findById(id)
		const friend = await User.findById(friendId)

		if (user.friends.includes(findById)) {
			user.friends = user.friends.filter(id => id !== friendId)
			friend.friends = friend.friends.filter(id => id !== id)
		} else {
			user.friends.push(friendId)
			friend.friends.push(id)
		}

		await user.save()
		await friend.save()

		const friends = await Promise.all(
			user.friends.map(id => User.findById(id))
		)
		const formattedFriend = friends.map(
			({ _id, firstName, lastName, uccupation, location, pictureUrl }) => {
				return { _id, firstName, lastName, uccupation, location, pictureUrl }
			}
		)

		res.status(200).json(formattedFriend)

	} catch (e) {
		return res.status(500).json({ err: e.message })
	}
}