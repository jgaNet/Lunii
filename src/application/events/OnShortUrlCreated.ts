import { EventHandler, IEventsBroker } from "infrastructure/bin/broker";
import { AnalyticsRepository } from "domains/analytics";
import { ShortUrlCreatedEvent } from "domains/shortUrl/events/ShortUrlCreatedEvent";

export class OnShortUrlCreated extends EventHandler<ShortUrlCreatedEvent> {
	#analyticsRepository: AnalyticsRepository;

	constructor(analyticsRepository: AnalyticsRepository) {
		super();
		this.#analyticsRepository = analyticsRepository;
	}

	subscribe(broker: IEventsBroker) {
		broker.addListener(ShortUrlCreatedEvent.NAME, this.handler.bind(this));
		return this;
	}

	async handler(event: ShortUrlCreatedEvent) {
		const itemFromDB =
			await this.#analyticsRepository.findOneShortUrlAnalytics(
				event.payload.shortId
			);

		if (!itemFromDB) {
			this.#analyticsRepository.saveShortUrlAnalytics({
				itemId: event.payload.shortId,
				originalUrl: event.payload.originalUrl,
				nbClicks: 0,
			});
		}
	}
}
