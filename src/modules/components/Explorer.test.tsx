import { NextRouter, useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

beforeEach(() => {
	jest.resetAllMocks();

	(useRouter as jest.Mock).mockImplementation(
		(): Partial<NextRouter> => ({
			query: {},
			pathname: "/",
			asPath: "/",
		}),
	);
});

import { render, screen, waitFor } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";
import { Explorer, RekorError } from "./Explorer";
import userEvent from "@testing-library/user-event";

describe("Explorer", () => {
	it("should render search form and display search button", () => {
		render(
			<RekorClientProvider>
				<Explorer />
			</RekorClientProvider>,
		);

		expect(screen.getByLabelText("Attribute")).toBeInTheDocument();
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
	});

	it("should handle invalid logIndex query parameter", () => {
		const mockRouter = {
			query: {
				logIndex: "invalid",
			},
			push: jest.fn(),
		};

		(useRouter as jest.Mock).mockImplementation(
			(): Partial<NextRouter> => mockRouter,
		);

		render(
			<RekorClientProvider>
				<Explorer />
			</RekorClientProvider>,
		);

		expect(mockRouter.push).not.toHaveBeenCalled();
	});

	it("displays loading indicator when fetching data", async () => {
		render(
			<RekorClientProvider>
				<Explorer />
			</RekorClientProvider>,
		);

		const button = screen.getByText("Search");
		await userEvent.click(button);

		await waitFor(() => expect(screen.queryByRole("status")).toBeNull());

		expect(
			screen.findByLabelText("Showing").then(res => {
				screen.debug();
				console.log(res);
				expect(res).toBeInTheDocument();
			}),
		);
	});

	describe("RekorError", () => {
		it("should render an Alert component if the error parameter is undefined", () => {
			render(<RekorError error={undefined} />);
			const alert = screen.getByRole("alert");
			expect(alert).toBeInTheDocument();
			expect(alert).toHaveTextContent("Unknown error");
		});

		it("should render an Alert component if error parameter is an empty object", () => {
			render(<RekorError error={{}} />);
			const alert = screen.getByRole("alert");
			expect(alert).toBeInTheDocument();
			expect(alert).toHaveTextContent("Unknown error");
		});
	});
});
