import mongoose from "mongoose";

const UserSchemas = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		userImg: {
			type: String,
			default: ""
		},
		friends: {
			type: Array,
			default: []
		},
		location: {
			type: String,
			default: ""
		},
		occupation: {
			type: String,
			default: ""
		},
	},
	{ timestamps: true }
)

const User = mongoose.model("User", UserSchemas)

export default User