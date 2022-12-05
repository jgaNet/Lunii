import { RedirectToOriginalUrlUseCase } from "application/commands/RedirectToOriginalUrlUseCase";
import { RedirectToOriginalUrlInputDTO } from "application/dtos";
import {
	ShortUrlFromDB,
	ShortUrlForDB,
	ShortUrlRepository,
	ShortUrl,
} from "domains/shortUrl";
import { ShortUrlCalledEvent } from "domains/shortUrl/events/ShortUrlCalledEvent";
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

describe("Test redirect to original url", () => {
	let generateShortUrlUseCase = new RedirectToOriginalUrlUseCase(
		new MockShortUrlRepository(),
		new InMemoryBroker()
	);

	beforeEach(
		() =>
			(generateShortUrlUseCase = new RedirectToOriginalUrlUseCase(
				new MockShortUrlRepository(),
				new InMemoryBroker()
			))
	);

	test("Should throw an error if short url not exists ", async () => {
		const input: RedirectToOriginalUrlInputDTO = {
			shortId: "not-ex",
		};

		await expect(generateShortUrlUseCase.execute(input)).rejects.toThrow(
			Error
		);
	});

	test("Should return original url if short url exists", async () => {
		const input: RedirectToOriginalUrlInputDTO = {
			shortId: "exists",
		};

		await expect(generateShortUrlUseCase.execute(input)).resolves.toEqual({
			originalUrl: "mockedOriginalUrl",
		});
	});

	test("Should emit an event for each generation", async () => {
		const input: RedirectToOriginalUrlInputDTO = {
			shortId: "exists",
		};

		let inMemoryBroker = new InMemoryBroker();

		let generateShortUrlUseCase = new RedirectToOriginalUrlUseCase(
			new MockShortUrlRepository(),
			inMemoryBroker
		);

		const emitSpy = jest.spyOn(inMemoryBroker, "emit");

		await generateShortUrlUseCase.execute(input);

		const newShortUrlCalledEvent = new ShortUrlCalledEvent({
			shortId: input.shortId,
			originalUrl: "mockedOriginalUrl",
		});

		expect(emitSpy).toBeCalledWith(
			"ShortUrlCalled",
			expect.objectContaining({ payload: newShortUrlCalledEvent.payload })
		);
	});
});
