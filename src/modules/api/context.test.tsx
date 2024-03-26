const originalEnv = process.env;

beforeEach(() => {
	jest.resetModules();
	process.env = {
		...originalEnv,
		NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN: "https://example.com",
	};
});

afterEach(() => {
	process.env = originalEnv;
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	RekorClientProvider,
	useRekorClient,
	useRekorBaseUrl,
} from "./context";

const TestConsumerComponent = () => {
	useRekorClient();
	const [baseUrl, setBaseUrl] = useRekorBaseUrl();

	return (
		<div>
			<button onClick={() => setBaseUrl("https://new.example.com")}>
				Change Base URL
			</button>
			<p>Base URL: {baseUrl}</p>
		</div>
	);
};

describe("RekorClientContext", () => {
	beforeAll(() => jest.clearAllMocks());

	it("provides a RekorClient instance and manages base URL", async () => {
		render(
			<RekorClientProvider>
				<TestConsumerComponent />
			</RekorClientProvider>,
		);

		expect(
			screen.getByText(/Base URL: https:\/\/example.com/),
		).toBeInTheDocument();

		await userEvent.click(screen.getByText(/Change Base URL/));

		expect(
			screen.getByText(/Base URL: https:\/\/new.example.com/),
		).toBeInTheDocument();
	});
});
