import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "./Settings";
import { fn } from "@storybook/test";
import { RekorClientProvider } from "../api/context";

const meta: Meta<typeof Settings> = {
	title: "Components/Settings",
	component: args => {
		return (
			<RekorClientProvider>
				<Settings {...args} />
			</RekorClientProvider>
		);
	},
	args: { onClose: fn() },
};

export default meta;
type Story = StoryObj<typeof Settings>;

export const Opened: Story = {
	args: {
		open: true,
	},
};

export const Closed: Story = {
	args: {
		open: false,
	},
};
