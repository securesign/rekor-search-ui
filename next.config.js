// const { codecovWebpackPlugin } = require("@codecov/webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	assetPrefix: "./",
	images: {
		loader: "akamai",
		path: "",
	},
	output: "standalone",
	transpilePackages: [
		"@patternfly/react-core",
		"@patternfly/react-icons",
		"@patternfly/react-styles",
	],
};

module.exports = nextConfig;
