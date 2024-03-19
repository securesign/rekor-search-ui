// Mock for decodex509 function
jest.mock("../modules/x509/decode", () => ({
	decodex509: jest.fn().mockReturnValue({
		publicKey: "Mocked Public Key",
		subject: "Mocked Subject",
	}),
}));
