import { render } from "@testing-library/react";
import { RekorClientProvider } from "../api/context";
import { EntryCard } from "./Entry";

describe("Entry", () => {
	it("renders", () => {
		//
	});
});

describe("EntryCard", () => {
	it("renders", () => {
		render(
			<RekorClientProvider>
				<EntryCard
					content={<></>}
					title={<></>}
				/>
			</RekorClientProvider>,
		);
	});
});
