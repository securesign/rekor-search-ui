jest.mock("react-syntax-highlighter/dist/cjs/styles/prism", () => ({}));
jest.mock("../utils/date", () => ({
	toRelativeDateString: jest.fn().mockReturnValue("Some Date"),
}));

import { fireEvent, render, screen } from "@testing-library/react";
import { Entry, EntryCard } from "./Entry";

const mockEntry = {
	someUuid: {
		body: Buffer.from(
			JSON.stringify({ kind: "hashedrekord", apiVersion: "v1", spec: {} }),
		).toString("base64"),
		attestation: { data: Buffer.from("{}").toString("base64") },
		logID: "123",
		logIndex: 123,
		integratedTime: 1618886400,
		publicKey: "mockedPublicKey",
	},
};

describe("Entry", () => {
	it.skip("renders and toggles the accordion content", () => {
		render(<Entry entry={mockEntry} />);

		// check if UUID link is rendered
		expect(screen.getByText("someUuid")).toBeInTheDocument();

		// simulate clicking the accordion toggle
		const toggleButton = screen.getByText("Raw Body");
		fireEvent.click(toggleButton);

		// now the accordion content should be visible
		expect(
			screen.getByText("Your expected content after decoding and dumping"),
		).toBeInTheDocument();
	});
});

describe("EntryCard", () => {
	it("renders the title and content", () => {
		render(
			<EntryCard
				title="Test Title"
				content="Test Content"
			/>,
		);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});
});
