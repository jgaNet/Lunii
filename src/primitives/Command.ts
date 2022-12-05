export interface Command<I, O> {
	execute(input: I): Promise<O>;
}
