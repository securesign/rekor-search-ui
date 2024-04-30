import type { Meta, StoryObj } from "@storybook/react";
import { SearchForm } from "./SearchForm";
import { RekorClientProvider } from "../api/context";
import { fn } from "@storybook/test";

const meta: Meta<typeof SearchForm> = {
	title: "Components/SearchForm",
	component: args => {
		return (
			<RekorClientProvider>
				<SearchForm {...args} />
			</RekorClientProvider>
		);
	},
	tags: ["autodocs"],
	args: { onSubmit: fn() },
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Loading: Story = {
	args: {
		isLoading: true,
	},
};

export const NotLoading: Story = {
	args: {
		isLoading: false,
	},
};
