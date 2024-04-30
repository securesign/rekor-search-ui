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
	webpack: config => {
		config.plugins = [
			...config.plugins,

			// keep codecov webpack plugin after all other plugins
			// codecovWebpackPlugin({
			// 	enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
			// 	bundleName: "rekor-search-ui-webpack-bundle",
			// 	uploadToken: process.env.CODECOV_TOKEN,
			// }),
		];

		// important: return the modified config
		return config;
	},
};

module.exports = nextConfig;
