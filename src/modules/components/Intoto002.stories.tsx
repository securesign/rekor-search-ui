import type { Meta, StoryObj } from "@storybook/react";
import { IntotoViewer002 } from "./Intoto002";

const meta: Meta<typeof IntotoViewer002> = {
	title: "Components/IntotoViewer002",
	component: IntotoViewer002,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IntotoViewer002>;

export const Default: Story = {
	args: {
		intoto: {
			content: {
				envelope: {
					payloadType: "application/vnd.in-toto+json",
					signatures: [
						{
							publicKey: Buffer.from("Mocked Public Key").toString("base64"),
							sig: Buffer.from("signature content", "utf-8").toString("base64"),
						},
					],
				},
				payloadHash: {
					algorithm: "sha256",
					value: "hashValue",
				},
			},
		},
	},
};
