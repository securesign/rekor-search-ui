import type { Meta, StoryObj } from "@storybook/react";
import { DSSEViewer } from "./DSSE";
import { DSSEV001Schema } from "rekor";

const meta: Meta<typeof DSSEViewer> = {
	title: "Components/DSSEViewer",
	component: DSSEViewer,
	parameters: {
		// layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DSSEViewer>;

const mockDSSE: DSSEV001Schema = {
	payloadHash: {
		algorithm: "sha256",
		value: "exampleHashValue",
	},
	signatures: [
		{
			signature: window.btoa("An example signature"),
			verifier: window.btoa("Verifier goes here"),
		},
	],
};

export const Default: Story = {
	args: {
		dsse: mockDSSE,
	},
};

export const Empty: Story = {
	args: {
		dsse: {},
	},
};
