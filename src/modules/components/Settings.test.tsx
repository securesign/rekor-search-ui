import { render } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";
import { Settings } from "./Settings";

describe("Settings", () => {
	it("renders", () => {
		render(
			<RekorClientProvider>
				<Settings
					onClose={jest.fn()}
					open={true}
				/>
			</RekorClientProvider>,
		);
	});
});
