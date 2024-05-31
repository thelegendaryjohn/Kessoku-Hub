import { startDatabase } from "../lib/db.js";
import { Song } from "../models/song.js";

const songs = [
	{
		index: 1,
		songName: "Seishun Complex",
		id: "60nwK1iMgnFCznF6FiNfts",
		length: "3:23",
	},
	{
		index: 2,
		songName: "Hitoribocchi Tokyo",
		id: "1ZFnNl8O8zd4mef77SAd91",
		length: "3:52",
	},
	{
		index: 3,
		songName: "Distortion!!",
		id: "3l8rIBKJUDQFqQfKvcpQ1w",
		length: "3:23",
	},
	{
		index: 4,
		songName: "Secret Base",
		id: "6P0RocRd21jJxs3E9vQoNH",
		length: "3:52",
	},
	{
		index: 5,
		songName: "Guitar, Loneliness and Blue Planet",
		id: "1rgncjmlpHMP3DBhpagyVb",
		length: "3:48",
	},
	{
		index: 6,
		songName: "I Can't Sing a Love Song",
		id: "5e9Pocvg3lRkVAsAKeiNio",
		length: "3:08",
	},
	{
		index: 7,
		songName: "That Band",
		id: "4Ji17AjAdjf83FsIDcXe0J",
		length: "3:33",
	},
	{
		index: 8,
		songName: "Karakara",
		id: "1ofAXq6xfHjn6ZUxdsY3YW",
		length: "4:25",
	},
	{
		index: 9,
		songName: "The Little Sea",
		id: "54SWXjFN2XYo3G5YiNSCqd",
		length: "3:43",
	},
	{
		index: 10,
		songName: "What Is Wrong With",
		id: "2Ifn0MXm7x9ddBQPUabV9a",
		length: "3:47",
	},
	{
		index: 11,
		songName: "Never Forget",
		id: "5ISHFvPLUqKz2JfDRtwnb2",
		length: "3:43",
	},
	{
		index: 12,
		songName: "If I Could Be a Constellation",
		id: "1iNhNmEwrd2TP4XrV7pQBI",
		length: "4:18",
	},
	{
		index: 13,
		songName: "Flashbacker",
		id: "2qdPWFrknWyLXYIPpbtAgD",
		length: "4:35",
	},
	{
		index: 14,
		songName: "Rockn' Roll, Morning Light Falls on You",
		id: "6wH2RsJUO8oypx8c5PG0bP",
		length: "4:31",
	},
];

// Connect to the database
startDatabase();

// Drop the existing Songs
Song.collection.drop().then(async () => {
	console.log("songs dropped.");
	// Generate the songs
	Song.create(songs).then(() => {
		console.log("songs creation finished.");
		process.exit();
	});
});
