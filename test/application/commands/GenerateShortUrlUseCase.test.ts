import { GenerateShortUrlUseCase } from "application/commands/GenerateShortUrlUseCase";
import { GenerateShortUrlInputDTO } from "application/dtos";
import {
	ShortUrlFromDB,
	ShortUrlForDB,
	ShortUrlRepository,
	ShortUrl,
} from "domains/shortUrl";
import { InMemoryBroker } from "infrastructure/bin/broker";

class MockShortUrlRepository implements ShortUrlRepository {
	async findById(shortId: string): Promise<ShortUrlFromDB | undefined> {
		if (shortId === "exists") {
			return {
				shortId: "exists",
				originalUrl: "mockedOriginalUrl",
			};
		}
	}

	async save(shortUrl: ShortUrlForDB): Promise<ShortUrlFromDB> {
		return shortUrl;
	}
}

describe("Test generate short url", () => {
	let generateShortUrlUseCase = new GenerateShortUrlUseCase(
		new MockShortUrlRepository(),
		new InMemoryBroker()
	);

	beforeEach(
		() =>
			(generateShortUrlUseCase = new GenerateShortUrlUseCase(
				new MockShortUrlRepository(),
				new InMemoryBroker()
			))
	);

	test("Should throw an error because url is malformatted", async () => {
		const input: GenerateShortUrlInputDTO = {
			originalUrl: "bad-url",
		};

		await expect(generateShortUrlUseCase.execute(input)).rejects.toThrow(
			Error
		);
	});

	test("Should throw an error if the short id already exists", async () => {
		const input: GenerateShortUrlInputDTO = {
			shortId: "exists",
			originalUrl: "http://test.fr",
		};

		await expect(generateShortUrlUseCase.execute(input)).rejects.toThrow(
			Error
		);
	});

	test("Should throw an error because short is more than size (6)", async () => {
		const input: GenerateShortUrlInputDTO = {
			shortId: "very-long-short-id",
			originalUrl: "http://test.fr",
		};

		await expect(generateShortUrlUseCase.execute(input)).rejects.toThrow(
			Error
		);
	});

	test("Should add a short url with the specified short id", async () => {
		const input: GenerateShortUrlInputDTO = {
			shortId: "new-id",
			originalUrl: "http://test.fr",
		};

		await expect(generateShortUrlUseCase.execute(input)).resolves.toEqual({
			originalUrl: "http://test.fr",
			shortId: "new-id",
		});
	});

	test("Should add a short url with a random short id", async () => {
		const input: GenerateShortUrlInputDTO = {
			originalUrl: "http://test.fr",
		};

		const result = await generateShortUrlUseCase.execute(input);

		expect(result.originalUrl).toBe(input.originalUrl);
		expect(result.shortId.length === 6).toBeTruthy();
		expect(typeof result.shortId).toBe("string");
	});

	test("Should save short url", async () => {
		const input: GenerateShortUrlInputDTO = {
			shortId: "new-id",
			originalUrl: "http://test.fr",
		};

		let mockShortUrlRepository = new MockShortUrlRepository();
		let generateShortUrlUseCase = new GenerateShortUrlUseCase(
			mockShortUrlRepository,
			new InMemoryBroker()
		);

		const saveUrlOnRepositorySpy = jest.spyOn(
			mockShortUrlRepository,
			"save"
		);

		await generateShortUrlUseCase.execute(input);
		const shortUrl = ShortUrl.new(input);
		expect(saveUrlOnRepositorySpy).toHaveBeenCalledWith(shortUrl);
	});
});
