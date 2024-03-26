jest.mock("next/router");
// @ts-ignore
import atobMock from "../../__mocks__/atobMock";

import { RekorClientProvider } from "../api/context";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DSSEViewer } from "./DSSE";
import { DSSEV001Schema } from "rekor";

describe("DSSEViewer Component", () => {
	beforeAll(() => {
		atobMock();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

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
