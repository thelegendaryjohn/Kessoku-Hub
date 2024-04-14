import mongoose from "mongoose";

mongoose
	.connect(
		"mongodb+srv://azareldev:bocchitherock@cluster0.nejuznn.mongodb.net/dev?retryWrites=true&w=majority"
		// TODO: Ideally, we should be using environment variables for the connection string password.
		// but for the purpose of this prototype, we'll hardcode it.
		// Should switch to .env file in the future.
	)
	.then(() => console.log("Connected to MongoDB!"))
	.catch((err) =>
		console.error("Could not connect to MongoDB:", err.message)
	);

export default mongoose;
