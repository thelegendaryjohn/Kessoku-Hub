import { Router } from "express";
import { render } from "../../lib/render.js";
//
const router = Router();

router.get("/user", (req, res) => {
    render(req, res, "account/profilePage");
});

export default router;