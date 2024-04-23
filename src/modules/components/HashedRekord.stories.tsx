import type { Meta, StoryObj } from "@storybook/react";
import { HashedRekordViewer } from "./HashedRekord";

const meta: Meta<typeof HashedRekordViewer> = {
	title: "Components/HashedRekord",
	component: HashedRekordViewer,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HashedRekordViewer>;

export const Default: Story = {
	args: {
		hashedRekord: {
			data: {
				hash: {
					algorithm: "sha256",
					value: "mockedHashValue",
				},
			},
			signature: {
				content: "mockedSignatureContent",
				publicKey: {
					content: window.btoa("mockedPublicKeyContent"), // base64 encode
				},
			},
		},
	},
};
