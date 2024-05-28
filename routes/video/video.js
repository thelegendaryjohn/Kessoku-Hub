import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

let videos = [
	{
		id: "5rWDFQ4PzOY",
		name: "Ep. 1 PV - Lonely Rolling Bocchi",
		videoType: "previews",
		length: "0:47"
	},
	{
		id: "oI8vZB-SRBE",
		name: "Ep. 2 PV - See You Tomorrow",
		videoType: "previews",
		length: "0:49"
	},
	{
		id: "WZxl3XhwCDQ",
		name: "Ep. 3 PV - Be Right There",
		videoType: "previews",
		length: "0:52"
	},
	{
		id: "QeeKTJhaJLo",
		name: "Ep. 4 PV - Jumping Girls",
		videoType: "previews",
		length: "1:11"
	},
	{
		id: "_m1VxtErpPo",
		name: "Ep. 5 PV - Flightless Fish",
		videoType: "previews",
		length: "0:51"
	},
	{
		id: "FM5ld8Tan4g",
		name: "Ep. 6 PV - Eight Views",
		videoType: "previews",
		length: "0:46"
	},
	{
		id: "Hi3dGsvgciI",
		name: "Ep. 7 PV - To Your House",
		videoType: "previews",
		length: "1:04"
	},
	{
		id: "IUO4neBlZI8",
		name: "Ep. 8 PV - Bocchi The Rock",
		videoType: "previews",
		length: "0:40"
	},
	{
		id: "q0tX10H8VGA",
		name: "Ep. 9 PV - Enoshima Escar",
		videoType: "previews",
		length: "1:00"
	},
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
		videoType: "music",
		length: "1:31"
    },
    {
        id: "B7BxrAAXl94",
        name: "Guitar, Loneliness and Blue Planet - Music Video",
		videoType: "music",
		length: "3:53"
    },
    {
        id: "L2i0i9gWE00",
        name: "That Band - Music Video",
		videoType: "music",
		length: "3:32"
    },
    {
        id: "gX9m-rCtSqc",
        name: "Never Forget - Music Video",
		videoType: "music",
		length: "3:37"
    },
    {
        id: "wSTbdqo-j74",
        name: "If I Could Be a Constellation - Music Video",
		videoType: "music",
		length: "4:14"
    },
    {
        id: "29t3pJd75XU",
        name: "Into the Light - Music Video",
		videoType: "music",
		length: "4:19"
    },
];
router.get("/videos", (req, res) => {
	render(req, res, "video/videoPage", {
		videos: videos,
	});
});

export default router;
