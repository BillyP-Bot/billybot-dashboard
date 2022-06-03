export * as config from "./config";
export * as constants from "./constants";
export * as storage from "./storage";
export { nextBackend, backendApi } from "./rest";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const readableDate = (dateIso: string) => {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone
	}).format(new Date(dateIso));
};

export const readableTime = (dateIso: string) => {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
		timeZone
	}).format(new Date(dateIso));
};
