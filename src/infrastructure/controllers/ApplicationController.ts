import { Application } from "application";

export class ApplicationController {
	protected application: Application;

	constructor(application: Application) {
		this.application = application;
	}
}
