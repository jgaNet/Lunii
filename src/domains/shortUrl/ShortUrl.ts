import { shortUrlRouter } from "infrastructure/bin/http/routes";
import { Url, ShortId } from "./valueObjects";

type newShortUrlDto = {
	shortId?: string;
	originalUrl: string;
};

export class ShortUrl {
	#shortId: ShortId;
	#originalUrl: Url;

	private constructor(shortId: ShortId, originalUrl: Url) {
		this.#originalUrl = originalUrl;
		this.#shortId = shortId;
	}

	static new(input: newShortUrlDto) {
		return new ShortUrl(
			ShortId.new(input.shortId),
			Url.new(input.originalUrl)
		);
	}

	get shortId() {
		return this.#shortId.value;
	}

	get originalUrl() {
		return this.#originalUrl.value;
	}
}
