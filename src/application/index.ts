import { IApplicationUseCases, IApplicationEvents } from "./dtos";

import { GenerateShortUrlUseCase } from "./commands/GenerateShortUrlUseCase";
import { RedirectToOriginalUrlUseCase } from "./commands/RedirectToOriginalUrlUseCase";
import { GetShortUrlAnalyticsUseCase } from "./queries/GetShortUrlAnalyticsUseCase";

import { ShortUrlInMemoryRepository } from "infrastructure/repositories/ShortUrlInMemoryRepository";
import { AnalyticsInMemoryRepository } from "infrastructure/repositories/AnalyticsInMemoryRepository";

import { InMemoryBroker } from "infrastructure/bin/broker";
import { OnShortUrlCalled } from "./events/OnShortUrlCalled";
import { OnShortUrlCreated } from "./events/OnShortUrlCreated";

const applicationInMemoryBroker = new InMemoryBroker();
const shortUrlInMemoryRepository = new ShortUrlInMemoryRepository();
const analyticsInMemoryRepository = new AnalyticsInMemoryRepository();

export class Application implements IApplicationUseCases {
	generateShortUrlUseCase: GenerateShortUrlUseCase;
	redirectToOriginalUrlUseCase: RedirectToOriginalUrlUseCase;
	getShortUrlAnalyticsUseCase: GetShortUrlAnalyticsUseCase;

	constructor(useCases: IApplicationUseCases, events: IApplicationEvents) {
		this.generateShortUrlUseCase = useCases.generateShortUrlUseCase;
		this.redirectToOriginalUrlUseCase =
			useCases.redirectToOriginalUrlUseCase;
		this.getShortUrlAnalyticsUseCase = useCases.getShortUrlAnalyticsUseCase;
		this.subscriptions(events);
	}

	subscriptions(events: IApplicationEvents) {
		events.onShortUrlCalled.subscribe(applicationInMemoryBroker);
		events.onShortUrlCreated.subscribe(applicationInMemoryBroker);
	}
}

const application = new Application(
	{
		generateShortUrlUseCase: new GenerateShortUrlUseCase(
			shortUrlInMemoryRepository,
			applicationInMemoryBroker
		),
		redirectToOriginalUrlUseCase: new RedirectToOriginalUrlUseCase(
			shortUrlInMemoryRepository,
			applicationInMemoryBroker
		),
		getShortUrlAnalyticsUseCase: new GetShortUrlAnalyticsUseCase(
			analyticsInMemoryRepository
		),
	},
	{
		onShortUrlCalled: new OnShortUrlCalled(analyticsInMemoryRepository),
		onShortUrlCreated: new OnShortUrlCreated(analyticsInMemoryRepository),
	}
);

export { application };
