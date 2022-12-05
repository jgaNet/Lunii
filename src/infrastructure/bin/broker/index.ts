import EventEmitter from "events";

export interface IEventsBroker {
	addListener(
		eventName: string | symbol,
		listener: (...args: any[]) => void
	): this;
	emit(eventName: string | symbol, arg1: unknown): void;
	on(eventName: string | symbol, listener: (...args: any[]) => void): void;
}

export class InMemoryBroker extends EventEmitter implements IEventsBroker {}

export abstract class EventHandler<T> {
	abstract handler(event: T): void;
}
