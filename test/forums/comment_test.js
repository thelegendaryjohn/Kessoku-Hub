import { expect } from "chai";
import request from "supertest";
import { app } from "../../lib/app.js";
import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";
import { Topic } from "../../models/topic.js";
import { Comment } from "../../models/comment.js"; // Adjust the path to where your Comment model is defined

describe("Comment Routes", () => {
	let cookie;
	let user;
	let post;
	let topic;

	before(async () => {
		// Clear the collections before each test
		await Topic.collection.drop();
		await User.collection.drop();
		await Post.collection.drop();
		await Comment.collection.drop();

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
		});
		await topic.save();
	});

	beforeEach(async () => {
		await Post.collection.drop();
		await Comment.collection.drop();
		// Create a new post
		post = new Post({
			title: "Test Title",
			content: "Test Content",
			authorId: user._id,
			topicId: topic._id,
		});
		await post.save();
	});

	describe("POST /thread/comment", () => {
		it("should create a new comment", (done) => {
			request(app)
				.post("/thread/comment")
				.send({
					content: "Test Comment",
					postId: post._id.toString(),
				})
				.set("Cookie", cookie) // Simulate logged in user
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						"content",
						"Test Comment"
					);
					expect(res.body)
						.to.have.property("authorId")
						.eql(user._id.toString());
					expect(res.body).to.have.property(
						"postId",
						post._id.toString()
					);
					done();
				});
		});

		it("should return 401 for invalid input", (done) => {
			request(app)
				.post("/thread/comment")
				.set("Cookie", cookie) // Simulate logged in user
				.send({ content: "Test Comment" }) // Missing postId
				.expect(401, done);
		});

		it("should return 401 if user is not logged in", (done) => {
			request(app)
				.post("/thread/comment")
				.send({
					content: "Test Comment",
					postId: post._id.toString(),
				})
				.expect(401, done);
		});
	});

	describe("GET /thread/comment/post/:id", () => {
		it("should get comments by post ID", (done) => {
			// Create a comment first
			const comment = new Comment({
				content: "Test Comment",
				authorId: user._id,
				postId: post._id,
			});
			comment.save().then(() => {
				request(app)
					.get(`/thread/comment/post/${post._id}`)
					.expect(200)
					.end((err, res) => {
						if (err) return done(err);
						expect(res.body).to.be.an("array");
						expect(res.body.length).to.equal(1);
						expect(res.body[0]).to.have.property(
							"content",
							"Test Comment"
						);
						expect(res.body[0]).to.have.property("authorId");
						expect(res.body[0].authorId)
							.to.have.property("_id")
							.eql(user._id.toString());
						done();
					});
			});
		});

		it("should return 401 for invalid input", (done) => {
			request(app)
				.get("/thread/comment/post/invalidid")
				.expect(401, done);
		});
	});

	describe("GET /thread/comment/:id", () => {
		it("should get a comment by ID", (done) => {
			// Create a comment first
			const comment = new Comment({
				content: "Test Comment",
				authorId: user._id,
				postId: post._id,
			});
			comment.save().then((savedComment) => {
				request(app)
					.get(`/thread/comment/${savedComment._id}`)
					.expect(200)
					.end((err, res) => {
						if (err) return done(err);
						expect(res.body).to.have.property(
							"content",
							"Test Comment"
						);
						expect(res.body).to.have.property("authorId");
						expect(res.body.authorId)
							.to.have.property("_id")
							.eql(user._id.toString());
						done();
					});
			});
		});

		it("should return 401 for invalid input", (done) => {
			request(app).get("/thread/comment/invalidid").expect(401, done);
		});
	});
});
