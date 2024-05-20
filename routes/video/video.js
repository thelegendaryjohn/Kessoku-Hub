import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

let videos = [
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
    },
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
    },
    {
        id: "Yd8kUoB72xU",
        name: "Seishun Complex - Music Video",
    },
    {
        id: "q0tX10H8VGA",
        name: "Ep. 9 PV - Enoshima Escar",
    }
	
];
router.get("/videos", (req, res) => {
	render(req, res, "video/videoPage", {
		videos: videos,
	});
});

export default router;
