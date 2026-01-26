// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

jest.mock("next/config", () => () => ({
	publicRuntimeConfig: {
		NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN: "https://rekor.sigstore.dev",
	},
}));

// Mock react-syntax-highlighter to avoid ESM issues in Jest (v16.x is ESM-only)
jest.mock("react-syntax-highlighter", () => {
	const React = require("react");
	return {
		Prism: ({ children }) =>
			React.createElement(
				"pre",
				{ "data-testid": "syntax-highlighter" },
				children,
			),
		Light: ({ children }) =>
			React.createElement(
				"pre",
				{ "data-testid": "syntax-highlighter" },
				children,
			),
	};
});

jest.mock("react-syntax-highlighter/dist/cjs/styles/prism", () => ({
	atomDark: {},
}));

Object.assign(global, { TextDecoder, TextEncoder });
