import { GenerateShortUrlUseCase } from "./commands/GenerateShortUrlUseCase";
import { RedirectToOriginalUrlUseCase } from "./commands/RedirectToOriginalUrlUseCase";
import { GetShortUrlAnalyticsUseCase } from "./queries/GetShortUrlAnalyticsUseCase";

import { OnShortUrlCalled } from "./events/OnShortUrlCalled";
import { OnShortUrlCreated } from "./events/OnShortUrlCreated";

export type GenerateShortUrlInputDTO = {
	shortId?: string;
	originalUrl: string;
};

export type GenerateShortUrlOutputDTO = {
	shortId: string;
	originalUrl: string;
};

export type RedirectToOriginalUrlInputDTO = {
	shortId: string;
};

export type RedirectToOriginalUrlOutputDTO = {
	originalUrl: string;
};

export type GetShortUrlAnalyticsInputDTO = void;

export type GetShortUrlAnalyticsOutputDTO = {
	shortId: string;
	originalUrl: string;
	nbClicks: number;
}[];

export interface IApplicationUseCases {
	generateShortUrlUseCase: GenerateShortUrlUseCase;
	redirectToOriginalUrlUseCase: RedirectToOriginalUrlUseCase;
	getShortUrlAnalyticsUseCase: GetShortUrlAnalyticsUseCase;
}

export interface IApplicationEvents {
	onShortUrlCalled: OnShortUrlCalled;
	onShortUrlCreated: OnShortUrlCreated;
}
