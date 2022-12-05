import { Application } from "application";
import { Request, Response } from "express";

import { ApplicationController } from "./ApplicationController";

export class ShortUrlController extends ApplicationController {
	constructor(application: Application) {
		super(application);
	}

	async create(req: Request, res: Response) {
		const { shortId, originalUrl } = req.body;

		if (!originalUrl) {
			res.send({
				status: 404,
				error: {
					message: "Missing original Url",
				},
			});
		}

		try {
			const result =
				await this.application.generateShortUrlUseCase.execute({
					shortId,
					originalUrl,
				});

			return res.send({
				status: 200,
				message: "Short url created",
				data: result,
			});
		} catch (e) {
			return res.send({
				status: 404,
				error: {
					message: (e as Error).message,
				},
			});
		}
	}

	async redirectToOriginalUrl(req: Request, res: Response) {
		const { shortUrlId } = req.params;
		try {
			const { originalUrl } =
				await this.application.redirectToOriginalUrlUseCase.execute({
					shortId: shortUrlId,
				});

			return res.redirect(originalUrl);
		} catch (e: unknown) {
			res.send({
				status: 404,
				error: {
					message: (e as Error).message,
				},
			});
		}
	}

	async getAnalytics(req: Request, res: Response) {
		const { shortUrlId } = req.params;
		const analytics =
			await this.application.getShortUrlAnalyticsUseCase.execute();

		return res.send({
			status: 200,
			message: "Short url analytics report",
			data: analytics,
		});
	}
}
