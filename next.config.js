const { codecovWebpackPlugin } = require("@codecov/webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN:
			process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN,
	},
	reactStrictMode: true,
	publicRuntimeConfig: {
		// remove private env variables
		processEnv: Object.fromEntries(
			Object.entries(process.env).filter(([key]) =>
				key.includes("NEXT_PUBLIC_"),
			),
		),
	},
	transpilePackages: [
		"@patternfly/react-core",
		"@patternfly/react-icons",
		"@patternfly/react-styles",
	],
	webpack: config => {
		config.plugins = [
			...config.plugins,

			// keep codecov webpack plugin after all other plugins
			codecovWebpackPlugin({
				enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
				bundleName: "rekor-search-ui-webpack-bundle",
				uploadToken: process.env.CODECOV_TOKEN,
			}),
		];

		// important: return the modified config
		return config;
	},
};

module.exports = nextConfig;
