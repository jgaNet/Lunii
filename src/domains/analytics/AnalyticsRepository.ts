export type ItemAnalytics = {
	itemId: string;
};

export type ShortUrlAnalyticsForDB = {
	originalUrl: string;
	nbClicks: number;
} & ItemAnalytics;

export type ShortUrlAnalyticsFromDB = ShortUrlAnalyticsForDB;

export interface AnalyticsRepository {
	findOneShortUrlAnalytics(
		itemId: string
	): Promise<ShortUrlAnalyticsFromDB | null>;
	findAllShortUrlAnalytics(): Promise<ShortUrlAnalyticsFromDB[]>;
	saveShortUrlAnalytics(
		item: ShortUrlAnalyticsForDB
	): Promise<ShortUrlAnalyticsFromDB>;
}
