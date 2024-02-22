/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: [
		"@patternfly/react-core",
		"@patternfly/react-styles"
	],
};

module.exports = nextConfig;
