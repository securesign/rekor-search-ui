jest.mock("next/router");

import { render } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";
import { Explorer } from "./Explorer";

describe("Explorer", () => {
	it("renders", () => {
		render(
			<RekorClientProvider>
				<Explorer />
			</RekorClientProvider>,
		);
	});
});
