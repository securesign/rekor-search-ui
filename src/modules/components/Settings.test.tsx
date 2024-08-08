jest.mock("../api/context", () => ({
	useRekorBaseUrl: jest.fn(),
}));

jest.mock("next/config", () => () => ({
	publicRuntimeConfig: {
		NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN: "https://default.rekor.domain",
	},
}));

import { render, screen } from "@testing-library/react";
import { Settings } from "./Settings";
import { useRekorBaseUrl } from "../api/context";

describe("Settings Component", () => {
	const mockOnClose = jest.fn();
	const mockSetBaseUrl = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		// mock initial state & updater function returned by useRekorBaseUrl
		(useRekorBaseUrl as jest.Mock).mockReturnValue([
			"https://initial.rekor.domain",
			mockSetBaseUrl,
		]);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("renders correctly with initial context value", () => {
		render(
			<Settings
				open={true}
				onClose={mockOnClose}
			/>,
		);
		expect(screen.getByLabelText("override rekor endpoint")).toHaveValue(
			"https://initial.rekor.domain",
		);
		expect(screen.getByText("Confirm")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});
});
