import { SearchForm } from "./SearchForm";
import { render } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";

describe("SearchForm", () => {
	it("renders", () => {
		render(
			<RekorClientProvider>
				<SearchForm
					isLoading={false}
					onSubmit={() => {}}
				/>
			</RekorClientProvider>,
		);
	});
});
