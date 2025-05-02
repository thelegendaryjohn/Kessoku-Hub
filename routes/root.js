import { Router } from "express";
import { render } from "../lib/render.js";
import { characters } from "../public/js/landing/characters.js";
import { Topic } from "../models/topic.js";
import { Post } from "../models/post.js";
import "dotenv/config";
import { songDB } from "../public/js/landing/music-section/songDB.js";
import {
	// getAccessToken,
	// getTrack,
	getPreviewFromSpotifyEmbed,
} from "../public/js/landing/music-section/spotifyApi.js";
//
// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
//
const router = Router();
let songs = songDB;

router.get("/", async (req, res) => {
	// Show announcement and discussion topics on the landing page
	const topics = await Topic.find({
		$or: [{ name: "Announcements" }, { name: "General Discussion" }],
	});
	let posts = {};
	for (let topic of topics) {
		posts[topic._id] = await Post.find({ topicId: topic._id })
			.sort({ createdAt: -1 })
			.limit(2)
			.populate("author", "-__v -email -password");
	}

	// Get access token from Spotify API
	// const accessToken = await getAccessToken(clientId, clientSecret);

	// songs = await Promise.all(
	// 	songs.map(async (song) => {
	// 		const trackData = await getTrack(song.id, accessToken);
	// 		return {
	// 			...song,
	// 			preview_url: trackData.preview_url,
	// 		};
	// 	})
	// );

	// Fetch tracks for each song ID and add preview URL to songs array
	songs = await Promise.all(
		songs.map(async (song) => {
			const preview_url = await getPreviewFromSpotifyEmbed(song.id);
			return {
				...song,
				preview_url,
			};
		})
	);

	render(req, res, "landingPage", {
		charNames: characters.map((char) => char.id),
		topics: topics,
		posts: posts,
		songs: songs,
	});
});

export default router;
