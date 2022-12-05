import {
	AnalyticsRepository,
	ShortUrlAnalyticsFromDB,
	ShortUrlAnalyticsForDB,
} from "domains/analytics";
import { Repository } from "../../primitives/Repository";

const keyValueInMemoryAnalyticsDB: Map<
	string,
	{ nbClicks: number; originalUrl: string }
> = new Map();

export class AnalyticsInMemoryRepository
	extends Repository
	implements AnalyticsRepository
{
	async findOneShortUrlAnalytics(
		itemId: string
	): Promise<ShortUrlAnalyticsFromDB | null> {
		const result = keyValueInMemoryAnalyticsDB.get(itemId);

		if (!result) {
			return null;
		}

		return {
			itemId: itemId,
			originalUrl: result.originalUrl,
			nbClicks: result.nbClicks,
		};
	}

	async findAllShortUrlAnalytics(): Promise<ShortUrlAnalyticsFromDB[]> {
		return Array.from(keyValueInMemoryAnalyticsDB.entries()).map(
			(value) => {
				return {
					itemId: value[0],
					originalUrl: value[1].originalUrl,
					nbClicks: value[1].nbClicks,
				};
			}
		);
	}

	async saveShortUrlAnalytics(
		item: ShortUrlAnalyticsFromDB
	): Promise<ShortUrlAnalyticsFromDB> {
		keyValueInMemoryAnalyticsDB.set(item.itemId, {
			nbClicks: item.nbClicks,
			originalUrl: item.originalUrl,
		});
		return item;
	}
}
