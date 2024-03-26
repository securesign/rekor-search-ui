jest.mock("./constants", () => ({
	digitalSignature: "digitalSignature",
	nonRepudiation: "nonRepudiation",
	keyEncipherment: "keyEncipherment",
	dataEncipherment: "dataEncipherment",
}));

jest.mock("@peculiar/x509", () => ({
	X509Certificate: jest.fn().mockImplementation(() => ({
		extensions: [],
		serialNumber: "123",
		issuer: { organization: ["Test Org"] },
		notBefore: new Date("2020-01-01"),
		notAfter: new Date("2025-01-01"),
		publicKey: { algorithm: "rsaEncryption" },
		subjectName: "CN=Test",
	})),
}));

jest.mock("../utils/date", () => ({
	toRelativeDateString: jest.fn(date => date.toISOString()),
}));

import { decodex509 } from "./decode";

describe("decodex509", () => {
	it("decodes a raw certificate string", () => {
		const rawCertificate =
			"-----BEGIN CERTIFICATE-----Mocked Certificate-----END CERTIFICATE-----";

		const decodedCert = decodex509(rawCertificate);

		expect(decodedCert).toMatchObject({
			data: {
				"Serial Number": expect.any(String),
			},
			Signature: {
				Issuer: expect.any(Object),
				Validity: {
					"Not Before": expect.any(String),
					"Not After": expect.any(String),
				},
				Algorithm: expect.any(String),
				Subject: expect.any(String),
			},
			"X509v3 extensions": expect.any(Object),
		});
	});
});
