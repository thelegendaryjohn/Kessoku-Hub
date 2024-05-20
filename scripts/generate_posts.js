import { startDatabase } from "../lib/db.js";
import { Topic } from "../models/topic.js";
import { Post } from "../models/post.js";
import { User } from "../models/user.js"; // Assuming you have a User model

// Sample posts data
const postsData = [
	{
		title: "Welcome to the forum!",
		content: "We are glad to have you here. Stay tuned for more updates.",
	},
	{
		title: "Forum Guidelines",
		content: "Please read the forum guidelines before posting.",
	},
	{
		title: "How to use the forum",
		content:
			"Here are some tips on how to navigate and use the forum effectively.",
	},
	{
		title: "Common issues and solutions",
		content: "Here are some common issues users face and their solutions.",
	},
	{
		title: "Off-Topic Fun",
		content: "Let's talk about something fun and unrelated to the forum!",
	},
	{
		title: "Feature Request",
		content: "Do you have any suggestions for new features? Let us know!",
	},
];

// Connect to the database
startDatabase();
await Post.collection.drop().then(async () => {
	try {
		// Drop existing posts
		console.log("Posts collection dropped.");

		// Get all topics
		const topics = await Topic.find({});

		// Assuming you have a default author user
		const defaultUser = await User.findOne({ username: "admin" }); // Adjust this query as needed to get an author user

		if (!defaultUser) {
			throw new Error("No default user found.");
		}

		// Generate posts for each topic
		const postPromises = topics.map((topic, index) => {
			const postData = postsData[index % postsData.length];
			const post = new Post({
				authorId: defaultUser._id,
				topicId: topic._id,
				title: postData.title,
				content: postData.content,
				viewCount: 0,
				likes: [],
				commentCount: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			return post.save();
		});

		await Promise.all(postPromises);
		console.log("Posts creation finished.");
		process.exit();
	} catch (error) {
		console.error("Error creating posts:", error);
		process.exit(1);
	}
});
