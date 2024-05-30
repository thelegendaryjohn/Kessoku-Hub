import { Router } from "express";
import fetch from "node-fetch";
import { render } from "../../lib/render.js";
import "dotenv/config";

const router = Router();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let songs = [
    {
        index: 1,
        songName: "Seishun Complex",
        id: "60nwK1iMgnFCznF6FiNfts",
        length: "3:23"
    },
    {
        index: 2,
        songName: "Hitoribocchi Tokyo",
        id: "1ZFnNl8O8zd4mef77SAd91",
        length: "3:52"
    },
    {
        index: 3,
        songName: "Distortion!!",
        id: "3l8rIBKJUDQFqQfKvcpQ1w",
        length: "3:23"
    },
    {
        index: 4,
        songName: "Secret Base",
        id: "6P0RocRd21jJxs3E9vQoNH",
        length: "3:52"
    },
    {
        index: 5,
        songName: "Guitar, Loneliness and Blue Planet",
        id: "1rgncjmlpHMP3DBhpagyVb",
        length: "3:48"
    },
    {
        index: 6,
        songName: "I Can't Sing a Love Song",
        id: "5e9Pocvg3lRkVAsAKeiNio",
        length: "3:08"
    },
    {
        index: 7,
        songName: "That Band",
        id: "4Ji17AjAdjf83FsIDcXe0J",
        length: "3:33"
    },
    {
        index: 8,
        songName: "Karakara",
        id: "1ofAXq6xfHjn6ZUxdsY3YW",
        length: "4:25"
    },
    {
        index: 9,
        songName: "The Little Sea",
        id: "54SWXjFN2XYo3G5YiNSCqd",
        length: "3:43"
    },
    {
        index: 10,
        songName: "What Is Wrong With",
        id: "2Ifn0MXm7x9ddBQPUabV9a",
        length: "3:47"
    },
    {
        index: 11,
        songName: "Never Forget",
        id: "5ISHFvPLUqKz2JfDRtwnb2",
        length: "3:43"
    },
    {
        index: 12,
        songName: "If I Could Be a Constellation",
        id: "1iNhNmEwrd2TP4XrV7pQBI",
        length: "4:18"
    },
    {
        index: 13,
        songName: "Flashbacker",
        id: "2qdPWFrknWyLXYIPpbtAgD",
        length: "4:35"
    },
    {
        index: 14,
        songName: "Rockn' Roll, Morning Light Falls on You",
        id: "6wH2RsJUO8oypx8c5PG0bP",
        length: "4:31"
    }
];

router.get("/music", async (req, res) => {
    try {
        // Get access token from Spotify API
        const accessToken = await getAccessToken(clientId, clientSecret);

        // Fetch tracks for each song ID and add preview URL to songs array
        songs = await Promise.all(songs.map(async (song) => {
            const trackData = await getTrack(song.id, accessToken);
            return {
                ...song,
                preview_url: trackData.preview_url
            };
        }));

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

async function getAccessToken(clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function getTrack(songId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch track ${songId}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
        preview_url: data.preview_url
    };
}

export default router;
