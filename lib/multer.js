import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Change the path to your desired upload folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

export default upload;
