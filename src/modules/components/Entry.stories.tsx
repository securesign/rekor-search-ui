import type { Meta, StoryObj } from "@storybook/react";
import { Entry } from "./Entry";

const meta: Meta<typeof Entry> = {
	title: "Components/Entry",
	component: Entry,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Entry>;

export const HashedRekord: Story = {
	args: {
		entry: {
			someUuid1: {
				body: Buffer.from(
					JSON.stringify({
						kind: "hashedrekord",
						apiVersion: "v1",
						spec: {
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
					}),
				).toString("base64"),
				attestation: { data: Buffer.from("{}").toString("base64") },
				logID: "123",
				logIndex: 123,
				integratedTime: 1618886400,
			},
		},
	},
};

export const Intoto: Story = {
	args: {
		entry: {
			someUuid1: {
				body: Buffer.from(
					JSON.stringify({
						kind: "intoto",
						apiVersion: "v1",
						spec: {
							content: {
								envelope: {
									payloadType: "application/vnd.in-toto+json",
									signatures: [
										{
											publicKey:
												Buffer.from("Mocked Public Key").toString("base64"),
											sig: Buffer.from("signature content", "utf-8").toString(
												"base64",
											),
										},
									],
								},
								payloadHash: {
									algorithm: "sha256",
									value: "hashValue",
								},
							},
						},
					}),
				).toString("base64"),
				attestation: { data: Buffer.from("{}").toString("base64") },
				logID: "456",
				logIndex: 456,
				integratedTime: 1618886401,
			},
		},
	},
};

export const DSSE: Story = {
	args: {
		entry: {
			someUuid2: {
				body: Buffer.from(
					JSON.stringify({
						kind: "dsse",
						apiVersion: "v1",
						spec: {
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
						},
					}),
				).toString("base64"),
				attestation: { data: Buffer.from("{}").toString("base64") },
				logID: "789",
				logIndex: 789,
				integratedTime: 1618886402,
			},
		},
	},
};
