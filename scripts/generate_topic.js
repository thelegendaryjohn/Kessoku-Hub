import { startDatabase } from "../lib/db.js";
import { Topic } from "../models/topic.js";

// Add topics into the mongo DB database based on the object array
const topics = [
	{
		name: "Announcements",
		description: "Important announcements from the administrators.",
		allowedRole: 2,
	},
	{
		name: "General Discussion",
		description: "General discussion about the forum.",
		allowedRole: 1,
	},
	{
		name: "Introductions",
		description: "New to the forum? Introduce yourself here.",
		allowedRole: 1,
	},
	{
		name: "Help",
		description: "Need help? Post your questions here.",
		allowedRole: 1,
	},
	{
		name: "Off-Topic",
		description: "Discuss anything not related to the forum.",
		allowedRole: 1,
	},
	{
		name: "Suggestions",
		description: "Suggest new features and improvements.",
		allowedRole: 1,
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
