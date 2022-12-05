import { GetShortUrlAnalyticsUseCase } from "application/queries/GetShortUrlAnalyticsUseCase";
import { AnalyticsRepository, ShortUrlAnalyticsForDB } from "domains/analytics";

class MockAnalyticsRepository implements AnalyticsRepository {
	async findAllShortUrlAnalytics(): Promise<ShortUrlAnalyticsForDB[]> {
		return [
			{ originalUrl: "mockedOriginalUrl", nbClicks: 2, itemId: "exists" },
		];
	}

	async findOneShortUrlAnalytics(
		itemId: string
	): Promise<ShortUrlAnalyticsForDB | null> {
		if (itemId === "exists") {
			return {
				originalUrl: "mockedOriginalUrl",
				nbClicks: 2,
				itemId: "exists",
			};
		}

		return null;
	}

	async saveShortUrlAnalytics(
		item: ShortUrlAnalyticsForDB
	): Promise<ShortUrlAnalyticsForDB> {
		return {} as ShortUrlAnalyticsForDB;
	}
}

describe("Get short report for analytics", () => {
	let getShortUrlAnalyticsUseCase = new GetShortUrlAnalyticsUseCase(
		new MockAnalyticsRepository()
	);

	beforeEach(
		() =>
			(getShortUrlAnalyticsUseCase = new GetShortUrlAnalyticsUseCase(
				new MockAnalyticsRepository()
			))
	);

	test("should return all short url", async () => {
		const result = await getShortUrlAnalyticsUseCase.execute();

		expect(result).toEqual([
			{
				originalUrl: "mockedOriginalUrl",
				nbClicks: 2,
				shortId: "exists",
			},
		]);
	});
});
