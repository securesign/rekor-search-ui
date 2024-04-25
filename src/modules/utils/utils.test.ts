import { isAcceptedProtocol, isValidUrl, validateUrl } from "./validateUrl";

describe("URL Validation Tests", () => {
	describe("Individual Function Tests", () => {
		it("isValidUrl: should validate URL structure", () => {
			expect(isValidUrl("http://validsite.com")).toBe(true);
			expect(isValidUrl("justastring")).toBe(false);
			expect(isValidUrl("")).toBe(false);
			expect(isValidUrl("http://invalidhostname")).toBe(false);
		});

		it("isAcceptedProtocol: should check for https protocols", () => {
			expect(isAcceptedProtocol("http://example.com")).toBe(false);
			expect(isAcceptedProtocol("example.com")).toBe(false);
			expect(isAcceptedProtocol("www.example.com")).toBe(false);
			expect(isAcceptedProtocol("ftp://example.com")).toBe(false);
			expect(isAcceptedProtocol("https://example.com")).toBe(true);
		});
	});

	describe("validateUrl: Composite Function Tests", () => {
		it("should return true for valid URLs with correct protocol", () => {
			expect(validateUrl("https://example.com")).toBe(true);
		});

		it("should return false for valid URLs with incorrect protocol", () => {
			expect(validateUrl("ftp://example.com")).toBe(false);
		});

		it("should return false for invalid URLs", () => {
			expect(validateUrl("justastring")).toBe(false);
		});
	});
});
