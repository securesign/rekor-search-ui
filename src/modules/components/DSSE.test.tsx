jest.mock("next/router");

import { RekorClientProvider } from "../api/context";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DSSEViewer } from "./DSSE";
import { DSSEV001Schema } from "rekor";

const mockDSSE: DSSEV001Schema = {
	payloadHash: {
		algorithm: "sha256",
		value: "exampleHashValue",
	},
	signatures: [
		{
			signature: "exampleSignature",
			verifier:
				"-----BEGIN CERTIFICATE-----\nexamplePublicKey\n-----END CERTIFICATE-----",
		},
	],
};

beforeAll(() => {
	window.atob = jest
		.fn()
		.mockImplementation(str => Buffer.from(str, "base64").toString("utf-8"));
});

describe("DSSEViewer Component", () => {
	it("renders without crashing", () => {
		render(
			<RekorClientProvider>
				<DSSEViewer dsse={mockDSSE} />
			</RekorClientProvider>,
		);
		expect(screen.getByText("Hash")).toBeInTheDocument();
	});

	it("displays the payload hash correctly", () => {
		render(<DSSEViewer dsse={mockDSSE} />);
		expect(
			screen.getByText(
				`${mockDSSE.payloadHash?.algorithm}:${mockDSSE.payloadHash?.value}`,
			),
		).toBeInTheDocument();
	});

	it("displays the signature correctly", () => {
		render(<DSSEViewer dsse={mockDSSE} />);
		expect(
			screen.getByText(mockDSSE.signatures![0].signature),
		).toBeInTheDocument();
	});

	it.skip("displays the public key certificate title and content correctly", () => {
		render(<DSSEViewer dsse={mockDSSE} />);
		expect(screen.getByText("Public Key Certificate")).toBeInTheDocument();
	});
});
