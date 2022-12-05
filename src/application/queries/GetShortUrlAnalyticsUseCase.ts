import { Query, Repository } from "primitives";
import {
	GetShortUrlAnalyticsInputDTO,
	GetShortUrlAnalyticsOutputDTO,
} from "application/dtos";

import { AnalyticsRepository } from "domains/analytics";

export class GetShortUrlAnalyticsUseCase
	implements
		Query<GetShortUrlAnalyticsInputDTO, GetShortUrlAnalyticsOutputDTO>
{
	private analyticsRepository: AnalyticsRepository;

	constructor(analyticsRepository: AnalyticsRepository) {
		this.analyticsRepository = analyticsRepository;
	}

	async execute(): Promise<GetShortUrlAnalyticsOutputDTO> {
		const items = await this.analyticsRepository.findAllShortUrlAnalytics();
		return items.map((item) => {
			return {
				shortId: item.itemId,
				originalUrl: item.originalUrl,
				nbClicks: item.nbClicks,
			};
		});
	}
}
