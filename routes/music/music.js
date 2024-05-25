import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

let songs = [
    {
		index: 1,
        songName: "Seishun Complex",
        url: "https://p.scdn.co/mp3-preview/c486afe8755680be0374427c9c758bd0a33ce975",
    },
    {
		index: 2,
        songName: "Hitoribocchi Tokyo",
        url: "https://p.scdn.co/mp3-preview/226a9d75995cd0a6511b4f446abd797c0c87d526",
    },
    {
		index: 3,
        songName: "Distortion!!",
        url: "https://p.scdn.co/mp3-preview/6dcfba8e5b36eb44cea7e8596b4e07127a9be1f5",
    },
    {
		index: 4,
        songName: "Secret Base",
        url: "https://p.scdn.co/mp3-preview/06fe47abb8ca62ac93c1f880fbbb8f59112c2bcc",
    },
    {
		index: 5,
        songName: "Guitar, Loneliness and Blue Planet",
        url: "https://p.scdn.co/mp3-preview/a9295d52b6afffcb197bbe7df875217ab868be74",
    },
    {
		index: 6,
        songName: "I Can't Sing a Love Song",
        url: "https://p.scdn.co/mp3-preview/f883af1db967bd99b0e0af5d2b3f238c5951853a",
    },
    {
		index: 7,
        songName: "That Band",
        url: "https://p.scdn.co/mp3-preview/d55c516e22bae896aac8ea7659fbe0a62662bbc4",
    },
    {
		index: 8,
        songName: "Karakara",
        url: "https://p.scdn.co/mp3-preview/05ac05afd3176835d2b33a7102b99af1725319be",
    },
    {
		index: 9,
        songName: "The Little Sea",
        url: "https://p.scdn.co/mp3-preview/5d19d6b4e9456dc3dd3bc267fb58363d3c2d9770",
    },
    {
		index: 10,
        songName: "What Is Wrong With",
        url: "https://p.scdn.co/mp3-preview/b639f87610923e9c91b37e37de945c3274d50c45",
    },
    {
		index: 11,
        songName: "Never Forget",
        url: "https://p.scdn.co/mp3-preview/d04aff0310ea91d734a91f39eff6dde23b9795df",
    },
    {
		index: 12,
        songName: "If I Could Be a Constellation",
        url: "https://p.scdn.co/mp3-preview/83bac988441bd8d4dc94421d12fb62efc6534f8f",
    },
    {
		index: 13,
        songName: "Flashbacker",
        url: "https://p.scdn.co/mp3-preview/3d923701b6c602dfaf135232a22295e462dc35ca",
    },
    {
		index: 14,
        songName: "Rockn' Roll, Morning Light Falls on You",
        url: "https://p.scdn.co/mp3-preview/c9e02da60b5be8a16f1bb7ae3c33e48ff4c9b79b",
    }
];


router.get("/music", (req, res) => {
	render(req, res, "music/musicPage", {
		songs: songs,
	});
});

export default router;
