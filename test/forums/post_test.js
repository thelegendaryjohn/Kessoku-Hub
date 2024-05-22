import { expect } from "chai";
import request from "supertest";
import { app } from "../../lib/app.js";
import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";
import { Topic } from "../../models/topic.js";

describe("Post Routes", () => {
	let cookie;
	let user;
	let post;
	let topic;

	before(async () => {
		// Clear the collections before each test
		await Topic.collection.drop();
		await User.collection.drop();

		// Create a new user
		user = new User({
			username: "testuser",
			password: "testpassword",
		});
		await user.save();

		// Log in the user
		await request(app)
			.post("/account/login")
			.send({
				username: "testuser",
				password: "testpassword",
				remember: true,
			})
			.expect("set-cookie", /connect.sid/)
			.expect(200)
			.then((res) => {
				cookie = res.header["set-cookie"];
			});

		// Create a new topic
		topic = new Topic({
			name: "Test Topic",
			description: "Test Description",
			allowedRole: 0,
		});
		await topic.save();
	});

	beforeEach(async () => {
		await Post.collection.drop();
		// Create a new post
		post = new Post({
			title: "Test Title",
			content: "Test Content",
			author: user._id,
			topicId: topic._id,
		});
		await post.save();
	});

	describe("POST /thread/post", () => {
		it("should create a new post", (done) => {
			request(app)
				.post("/thread/post")
				.send({
					title: "New Post",
					content: "New Content",
					topic: topic._id.toString(),
				})
				.set("Cookie", cookie) // Simulate logged in user
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property("title", "New Post");
					expect(res.body).to.have.property("content", "New Content");
					expect(res.body)
						.to.have.property("author")
						.eql(user._id.toString());
					done();
				});
		});

		it("should return 401 if the topic wasnt found", (done) => {
			request(app)
				.post("/thread/post")
				.set("Cookie", cookie) // Simulate logged in user
				.send({ title: "New Post", content: "New Content" }) // Missing content
				.expect(401, done);
		});

		it("should return 401 if user is not logged in", (done) => {
			request(app)
				.post("/thread/post")
				.send({
					title: "New Post",
					content: "New Content",
					topic: "Test Topic",
				})
				.expect(401, done);
		});

		it("should return 401 for invalid input", (done) => {
			request(app)
				.post("/thread/post")
				.set("Cookie", cookie) // Simulate logged in user
				.send({ title: "New Post" }) // Missing content
				.expect(401, done);
		});
	});

	describe("GET /thread/post/:id", () => {
		it("should get a post by ID", (done) => {
			request(app)
				.get(`/thread/post/${post._id}`)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					console.log(res.body);
					expect(res.body).to.have.property("title", "Test Title");
					expect(res.body).to.have.property(
						"content",
						"Test Content"
					);
					expect(res.body).to.have.property("author");
					expect(res.body.author)
						.to.have.property("_id")
						.eql(user._id.toString());
					done();
				});
		});

		it("should return 401 for invalid input", (done) => {
			request(app).get("/thread/post/invalidid").expect(401, done);
		});
	});
});
