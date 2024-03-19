import { SearchForm } from "./SearchForm";
import { render, screen, waitFor } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";
import userEvent from "@testing-library/user-event";

describe("SearchForm", () => {
	it("submits the correct form data", async () => {
		const mockOnSubmit = jest.fn();
		render(
			<RekorClientProvider>
				<SearchForm
					onSubmit={mockOnSubmit}
					isLoading={false}
				/>
			</RekorClientProvider>,
		);

		// assume "email" is the default selected attribute; otherwise, select it first
		await userEvent.type(
			screen.getByLabelText(/Email input field/i),
			"test@example.com",
		);

		// submit the form
		await userEvent.click(screen.getByText(/Search/i));

		await waitFor(() => {
			expect(mockOnSubmit).toHaveBeenCalled();
		});
	});
});
