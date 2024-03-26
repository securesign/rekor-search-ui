jest.mock("next/router");

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";
import { Explorer } from "./Explorer";

describe("Explorer", () => {
	jest.mock("../api/rekor_api", () => ({
		useRekorSearch: jest.fn(() =>
			jest.fn().mockImplementation(() => {
				return Promise.resolve({ entries: [], totalCount: 0 });
			}),
		),
	}));

	it("renders without issues", () => {
		render(
			<RekorClientProvider>
				<Explorer />
			</RekorClientProvider>,
		);

		expect(screen.getByText("Search")).toBeInTheDocument();
	});

	it("displays loading indicator when fetching data", async () => {
		render(
			<RekorClientProvider>
				<Explorer />
			</RekorClientProvider>,
		);

		const button = screen.getByText("Search");
		fireEvent.click(button);

		await waitFor(() => expect(screen.queryByRole("status")).toBeNull());

		expect(
			screen
				.findByLabelText("Showing" || "No matching entries found")
				.then(res => {
					expect(res).toBeInTheDocument();
				}),
		);
	});
});
