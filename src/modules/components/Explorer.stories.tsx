import type { Meta, StoryObj } from "@storybook/react";
import { Explorer } from "./Explorer";
import { RekorClientProvider } from "../api/context";

const meta: Meta<typeof Explorer> = {
	title: "Components/Explorer",
	component: args => {
		return (
			<RekorClientProvider>
				<Explorer {...args} />
			</RekorClientProvider>
		);
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Explorer>;

export const Default: Story = {
	args: {},
};
