export class Url {
	#value: string;

	private constructor(value: string) {
		this.#value = value;
	}

	static new(value: string) {
		const expression =
			/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
		const regex = new RegExp(expression);

		if (value.match(regex)) {
			return new Url(value);
		} else {
			throw new Error(`Invalid Url format: ${value}`);
		}
	}

	get value() {
		return this.#value;
	}
}
