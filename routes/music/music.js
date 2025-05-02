import { Router } from "express";
// import fetch from "node-fetch";
import { render } from "../../lib/render.js";
import "dotenv/config";
import { songDB } from "../../public/js/landing/music-section/songDB.js";
import {
	// getAccessToken,
	// getTrack,
	getPreviewFromSpotifyEmbed,
} from "../../public/js/landing/music-section/spotifyApi.js";
const router = Router();

// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let songs = songDB;

router.get("/music", async (req, res) => {
	try {
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

		// Render the music page with the updated songs array
		render(req, res, "music/musicPage", {
			songs: songs,
		});
	} catch (error) {
		console.error("Error fetching tracks:", error);
		// Handle error appropriately
		res.status(500).send("Error fetching tracks");
	}
});

export default router;
