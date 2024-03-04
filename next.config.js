/** @type {import('next').NextConfig} */
const nextConfig = {
	modularizeImports: {
		"@patternfly/react-icons": {
			transform: "@patternfly/react-icons/{{member}}",
		},
	},
	reactStrictMode: true,
	transpilePackages: ["@patternfly/react-core", "@patternfly/react-styles"],
};

module.exports = nextConfig;
