import { startDatabase } from "../lib/db.js";
import { Topic } from "../models/topic.js";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { Comment } from "../models/comment.js";

// Sample posts data
const postsData = [
	[
		{
			title: "Welcome to the forum!",
			content:
				"We are glad to have you here. Stay tuned for more updates.",
			topic: "Announcements",
		},
		{
			title: "Bocchi the Rock Season 2 announced!",
			content:
				"The second season of Bocchi the Rock has been announced. Are you excited?",
			topic: "Announcements",
		},
	],
	[
		{
			title: "Forum Guidelines",
			content: "Please read the forum guidelines before posting.",
			topic: "Introductions",
		},
		{
			title: "Forum Rules",
			content:
				"Here are some rules you need to follow while using the forum.",
			topic: "Introductions",
		},
	],
	[
		{
			title: "How to use the forum",
			content:
				"Here are some tips on how to navigate and use the forum effectively.",
			topic: "General Discussion",
		},
		{
			title: "Forum FAQ",
			content: "Frequently asked questions about the forum.",
			topic: "General Discussion",
		},
	],
	[
		{
			title: "Common issues and solutions",
			content:
				"Here are some common issues users face and their solutions.",
			topic: "Help",
		},
		{
			title: "Forum Updates",
			content: "Stay updated with the latest forum news and updates.",
			topic: "Help",
		},
	],
	[
		{
			title: "Off-Topic Fun",
			content:
				"Let's talk about something fun and unrelated to the forum!",
			topic: "Off-Topic",
		},
		{
			title: "Introduce Yourself",
			content: "New to the forum? Introduce yourself here!",
			topic: "Off-Topic",
		},
	],
	[
		{
			title: "Feature Request",
			content:
				"Do you have any suggestions for new features? Let us know!",
			topic: "Suggestions",
		},
		{
			title: "Improvements",
			content: "How can we make the forum better? Share your thoughts!",
			topic: "Suggestions",
		},
	],
];

// Connect to the database
startDatabase();
Post.collection.drop().then(async () => {
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

		function generateRandomComments(postId, maxComments = 10) {
			const comments = [];
			for (
				let i = 0;
				i < Math.floor(Math.random() * maxComments) + 1;
				i++
			) {
				comments.push({
					author: defaultUser._id, // Assuming defaultUser is the author of comments as well
					postId: postId,
					content: `Random comment ${i + 1}`,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
			return comments;
		}

		// Generate posts for each topic
		const postPromises = topics.flatMap((topic) => {
			return postsData.flatMap((posts) => {
				return posts
					.filter((postData) => postData.topic === topic.name)
					.map(async (postData) => {
						const post = new Post({
							author: defaultUser._id,
							topicId: topic._id,
							title: postData.title,
							content: postData.content,
							viewCount: 0,
							likes: [],
							commentCount: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						});
						const savedPost = await post.save();

						// Generate and save comments for the post
						const comments = generateRandomComments(savedPost._id);
						const commentPromises = comments.map((commentData) => {
							const comment = new Comment(commentData);
							return comment.save();
						});
						await Promise.all(commentPromises);

						// Update post comment count
						savedPost.commentCount = comments.length;
						await savedPost.save();
					});
			});
		});

		await Promise.all(postPromises);
		console.log("Posts creation finished.");
		process.exit();
	} catch (error) {
		console.error("Error creating posts:", error);
		process.exit(1);
	}
});
