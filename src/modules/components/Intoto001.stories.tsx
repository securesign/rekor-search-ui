import type { Meta, StoryObj } from "@storybook/react";
import { IntotoViewer001 } from "./Intoto001";

const meta: Meta<typeof IntotoViewer001> = {
	title: "Components/IntotoViewer001",
	component: IntotoViewer001,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IntotoViewer001>;

export const Default: Story = {
	args: {
		intoto: {
			content: {
				payloadHash: {
					algorithm: "sha256",
					value: "hashValue",
				},
			},
			publicKey: "publicKey",
		},
	},
};
