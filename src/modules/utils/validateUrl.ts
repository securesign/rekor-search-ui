export function validateUrl(url?: string): boolean {
	if (!url) return false;
	return isAcceptedProtocol(url) && isValidUrl(url);
}

/**
 * Checks if the given URL is using an accepted protocol.
 * @param url The URL to validate.
 * @returns True if the URL is valid, false otherwise.
 */
export function isAcceptedProtocol(url: string): boolean {
	try {
		const parsedUrl = new URL(url);
		return ["https:"].includes(parsedUrl.protocol);
	} catch (error) {
		return false;
	}
}

/**
 * Checks if the given string is a valid URL.
 * @param url The URL to validate.
 * @returns True if the URL is valid, false otherwise.
 */
export const isValidUrl = (url: string): boolean => {
	try {
		const parsedUrl = new URL(url);
		// check for presence of a dot
		return parsedUrl.hostname.includes(".");
	} catch (error) {
		return false;
	}
};
