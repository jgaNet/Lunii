export type ShortUrlFromDB = {
	shortId: string;
	originalUrl: string;
};

export type ShortUrlForDB = ShortUrlFromDB;

export interface ShortUrlRepository {
	findById(shortId: string): Promise<ShortUrlFromDB | undefined>;
	save(shortUrl: ShortUrlForDB): Promise<ShortUrlFromDB>;
}
