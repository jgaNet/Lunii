import { ShortUrl } from "domains/shortUrl";
import {
	ShortUrlRepository,
	ShortUrlFromDB,
	ShortUrlForDB,
} from "domains/shortUrl";
import { Repository } from "../../primitives/Repository";

const keyValueInMemoryShortUrlDB: Map<string, ShortUrlFromDB> = new Map();

export class ShortUrlInMemoryRepository
	extends Repository
	implements ShortUrlRepository
{
	async findById(shortId: string): Promise<ShortUrlFromDB | undefined> {
		const result = keyValueInMemoryShortUrlDB.get(shortId);
		return result;
	}

	async save(shortUrl: ShortUrlForDB): Promise<ShortUrlFromDB> {
		keyValueInMemoryShortUrlDB.set(shortUrl.shortId, {
			originalUrl: shortUrl.originalUrl,
			shortId: shortUrl.shortId,
		});
		return shortUrl;
	}
}
