import { Command, Repository } from "primitives";
import { ShortUrl, ShortUrlRepository } from "domains/shortUrl";
import {
	GenerateShortUrlInputDTO,
	GenerateShortUrlOutputDTO,
} from "application/dtos";
import { IEventsBroker } from "infrastructure/bin/broker";
import { ShortUrlCreatedEvent } from "domains/shortUrl/events/ShortUrlCreatedEvent";

export class GenerateShortUrlUseCase
	implements Command<GenerateShortUrlInputDTO, GenerateShortUrlOutputDTO>
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

	async execute(input: GenerateShortUrlInputDTO) {
		if (input.shortId) {
			const shortUrlFromDB = await this.shortUrlRepository.findById(
				input.shortId
			);

			if (shortUrlFromDB) {
				throw Error(`Short url ${input.shortId} already exists`);
			}
		}

		const newShortUrl = ShortUrl.new(input);

		await this.shortUrlRepository.save(newShortUrl);

		const shortUrlCreatedEvent = new ShortUrlCreatedEvent(newShortUrl);

		this.appEventsBroker.emit(
			ShortUrlCreatedEvent.NAME,
			shortUrlCreatedEvent
		);

		return {
			shortId: newShortUrl.shortId,
			originalUrl: newShortUrl.originalUrl,
		};
	}
}
