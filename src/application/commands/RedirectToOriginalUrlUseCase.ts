import { Command } from "primitives";
import {
	RedirectToOriginalUrlInputDTO,
	RedirectToOriginalUrlOutputDTO,
} from "application/dtos";
import { ShortUrlRepository } from "domains/shortUrl/ShortUrlRepository";
import { IEventsBroker } from "infrastructure/bin/broker";

import { ShortUrlCalledEvent } from "domains/shortUrl/events/ShortUrlCalledEvent";

export class RedirectToOriginalUrlUseCase
	implements
		Command<RedirectToOriginalUrlInputDTO, RedirectToOriginalUrlOutputDTO>
{
	private shortUrlRepository: ShortUrlRepository;
	private appEventsBroker: IEventsBroker;

	constructor(
		shortUrlRepository: ShortUrlRepository,
		appEventsBroker: IEventsBroker
	) {
		this.shortUrlRepository = shortUrlRepository;
		this.appEventsBroker = appEventsBroker;
	}

	async execute(input: RedirectToOriginalUrlInputDTO) {
		const shortUrl = await this.shortUrlRepository.findById(input.shortId);

		if (!shortUrl) {
			throw new Error(`Short url ${input.shortId} not found`);
		}

		const shortUrlCalled = new ShortUrlCalledEvent(shortUrl);

		this.appEventsBroker.emit(ShortUrlCalledEvent.NAME, shortUrlCalled);

		return {
			originalUrl: shortUrl.originalUrl,
		};
	}
}
