/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
