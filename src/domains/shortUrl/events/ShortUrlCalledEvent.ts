import { ShortUrl } from "../ShortUrl";

export type ShortUrlCalledPayloadDTO = {
	shortId: string;
	originalUrl: string;
};

export class ShortUrlCalledEvent {
	static NAME: string = "ShortUrlCalled";

	#payload: ShortUrlCalledPayloadDTO;

	constructor(shortUrl: ShortUrlCalledPayloadDTO) {
		this.#payload = shortUrl;
	}

	static new(shortUrl: ShortUrlCalledPayloadDTO): ShortUrlCalledEvent {
		return new ShortUrlCalledEvent(shortUrl);
	}

	get payload(): ShortUrlCalledPayloadDTO {
		return this.#payload;
	}
}
