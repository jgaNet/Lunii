export class ShortId {
	#value: string;
	static readonly size = 6;

	private constructor(value?: string) {
		this.#value = value || this.generate();
	}

	private generate() {
		return Math.random().toString(36).slice(-6);
	}

	static new(value?: string) {
		if (value && value.length > ShortId.size) {
			throw new Error(
				`Short id length should be equal to ${ShortId.size}`
			);
		}

		return new ShortId(value);
	}

	get value() {
		return this.#value;
	}
}
