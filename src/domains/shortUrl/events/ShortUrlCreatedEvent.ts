type ShortUrlCreatedPayloadDTO = {
	shortId: string;
	originalUrl: string;
};

export class ShortUrlCreatedEvent {
	static NAME: string = "ShortUrlCreated";

	#payload: ShortUrlCreatedPayloadDTO;

	constructor(shortUrl: ShortUrlCreatedPayloadDTO) {
		this.#payload = shortUrl;
	}

	static new(shortUrl: ShortUrlCreatedPayloadDTO) {
		return new ShortUrlCreatedEvent(shortUrl);
	}

	get payload() {
		return this.#payload;
	}
}
