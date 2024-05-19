import { startDatabase } from "../lib/db.js";
import { Topic } from "../models/topic.js";

// Add topics into the mongo DB database based on the object array
const topics = [
	{
		name: "Announcements",
		description: "Important announcements from the administrators.",
	},
	{
		name: "General Discussion",
		description: "General discussion about the forum.",
	},
	{
		name: "Introductions",
		description: "New to the forum? Introduce yourself here.",
	},
	{
		name: "Help",
		description: "Need help? Post your questions here.",
	},
	{
		name: "Off-Topic",
		description: "Discuss anything not related to the forum.",
	},
	{
		name: "Suggestions",
		description: "Suggest new features and improvements.",
	},
];

// Connect to the database
startDatabase();

// Drop the existing topics
Topic.collection.drop().then(async () => {
	console.log("Topics dropped.");
	// Generate the topics
	Topic.create(topics).then(() => {
		console.log("Topics creation finished.");
		process.exit();
	});
});
