import express from "express";
import { application } from "application";
import { ShortUrlController } from "infrastructure/controllers/ShortUrlController";

const router = express.Router();
const shortUrlController = new ShortUrlController(application);

router.post("/", async (req, res) => {
	return shortUrlController.create(req, res);
});

router.get("/analytics", async (req, res) => {
	return shortUrlController.getAnalytics(req, res);
});

router.get("/:shortUrlId", async (req, res) => {
	return shortUrlController.redirectToOriginalUrl(req, res);
});

export const shortUrlRouter = router;
