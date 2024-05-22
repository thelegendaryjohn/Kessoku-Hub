import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

let videos = [
	{
		id: "5rWDFQ4PzOY",
		name: "Ep. 1 PV - Lonely Rolling Bocchi",
		videoType: "previews"
	},
	{
		id: "oI8vZB-SRBE",
		name: "Ep. 2 PV - See You Tomorrow",
		videoType: "previews"
	},
	{
		id: "WZxl3XhwCDQ",
		name: "Ep. 3 PV - Be Right There",
		videoType: "previews"
	},
	{
		id: "q0tX10H8VGA",
		name: "Ep. 9 PV - Enoshima Escar",
		videoType: "previews"
	},
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
		videoType: "music"
    },
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
		videoType: "music"
    },
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
		videoType: "music"
    },
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
		videoType: "music"
    },	
];
router.get("/videos", (req, res) => {
	render(req, res, "video/videoPage", {
		videos: videos,
	});
});

export default router;
