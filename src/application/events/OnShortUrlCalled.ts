import { InMemoryBroker, EventHandler } from "infrastructure/bin/broker";
import { AnalyticsRepository } from "domains/analytics";
import { ShortUrlCalledEvent } from "domains/shortUrl/events/ShortUrlCalledEvent";

export class OnShortUrlCalled extends EventHandler<ShortUrlCalledEvent> {
	#analyticsRepository: AnalyticsRepository;

	constructor(analyticsRepository: AnalyticsRepository) {
		super();
		this.#analyticsRepository = analyticsRepository;
	}

	subscribe(broker: InMemoryBroker) {
		broker.addListener(ShortUrlCalledEvent.NAME, this.handler.bind(this));
		return this;
	}

	async handler(event: ShortUrlCalledEvent) {
		const shortUrlItem =
			await this.#analyticsRepository.findOneShortUrlAnalytics(
				event.payload.shortId
			);

		if (!shortUrlItem) {
			throw Error("This short url item not exist");
		}

		shortUrlItem.nbClicks = shortUrlItem.nbClicks + 1;

		this.#analyticsRepository.saveShortUrlAnalytics(shortUrlItem);
	}
}
