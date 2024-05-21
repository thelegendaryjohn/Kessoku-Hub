import { expect } from "chai";
import { Topic } from "../../models/topic.js"; // Adjust the path to where your Topic model is defined

describe("Topic Model", () => {
	beforeEach(async () => {
		// Clear the Topic collection before each test
		await Topic.collection.drop();
	});

	describe("Creating a Topic", () => {
		it("should create a new topic", async () => {
			const newTopic = {
				name: "Test Topic",
				description: "Test Description",
				allowedRole: 1,
			};
			const topic = new Topic(newTopic);
			const savedTopic = await topic.save();

			expect(savedTopic).to.have.property("name", newTopic.name);
			expect(savedTopic).to.have.property(
				"description",
				newTopic.description
			);
			expect(savedTopic).to.have.property("createdAt");
			expect(savedTopic).to.have.property("updatedAt");
		});

		it("should throw an error if name is missing", async () => {
			const newTopic = { description: "Test Description" };
			try {
				const topic = new Topic(newTopic);
				await topic.save();
			} catch (err) {
				expect(err).to.exist;
				expect(err.errors).to.have.property("name");
				expect(err.errors.name).to.have.property("kind", "required");
			}
		});

		it("should throw an error if description is missing", async () => {
			const newTopic = { name: "Test Topic" };
			try {
				const topic = new Topic(newTopic);
				await topic.save();
			} catch (err) {
				expect(err).to.exist;
				expect(err.errors).to.have.property("description");
				expect(err.errors.description).to.have.property(
					"kind",
					"required"
				);
			}
		});

		it("should throw an error if topic name is not unique", async () => {
			const newTopic = {
				name: "Test Topic",
				description: "Test Description",
			};
			const topic1 = new Topic(newTopic);
			await topic1.save();

			try {
				const topic2 = new Topic(newTopic);
				await topic2.save();
			} catch (err) {
				expect(err).to.exist;
				expect(err).to.have.property("code", 11000); // Duplicate key error code
			}
		});
	});
});
