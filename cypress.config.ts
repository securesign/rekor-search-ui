import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://nextjs:3000",
		experimentalStudio: true,
		projectId: "i3pt7t",
	},
});
