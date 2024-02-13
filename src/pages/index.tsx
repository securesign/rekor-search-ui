import SettingsIcon from "@mui/icons-material/Settings";
import {
	Container,
	IconButton,
	Link,
	Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
	Page
} from '@patternfly/react-core';
import { RekorClientProvider } from "../modules/api/context";
import { Explorer } from "../modules/components/Explorer";
import { Settings } from "../modules/components/Settings";
import { ReBox } from "../modules/components/wrappers/ReBox";

const Home: NextPage = () => {
	const [settingsOpen, setSettingsOpen] = useState(false);

	return (
		<Page>
			<Head>
				<title>Rekor Search</title>
				<meta
					name="description"
					content="Search the Rekor public transparency log"
				/>
				<link
					rel="icon"
					href="/logo.png"
				/>
			</Head>

				<ReBox
					// sx={{
					// 	display: "flex",
					// 	justifyContent: "space-between",
					// 	alignItems: "center",
					// 	paddingX: 4,
					// 	paddingY: 2,
					// 	background: "white",
					// 	borderBottom: "1px solid #E3E0E6",
					// }}
				>
					<ReBox
						// sx={{ height: 41, width: 198, position: "relative" }}
					>
						<Link
							href="https://sigstore.dev"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/sigstore_rekor-horizontal-color.svg"
								alt="Rekor Logo"
								fill
							/>
						</Link>
					</ReBox>

					<Typography variant="h4">Rekor Search</Typography>

					<ReBox
						// sx={{
						// 	width: 198,
						// 	display: "flex",
						// 	justifyContent: "flex-end",
						// 	alignItems: "center",
						// }}
					>
						<IconButton
							sx={{ mr: 2 }}
							aria-label="settings"
							color="inherit"
							size="small"
							onClick={() => setSettingsOpen(true)}
						>
							<SettingsIcon />
						</IconButton>
						<Link
							href="https://github.com/sigstore/rekor-search-ui"
							target="_blank"
							rel="noopener noreferrer"
							sx={{ lineHeight: 0 }}
						>
							<Image
								src="/github.svg"
								alt="GitHub"
								color="white"
								width={24}
								height={24}
							/>
						</Link>
					</ReBox>
				</ReBox>

				<Settings
					open={settingsOpen}
					onClose={() => setSettingsOpen(false)}
				/>

				<Container
					sx={{
						mt: 4,
						display: "flex",
						flexDirection: "column",
						gap: 3,
					}}
				>
					<Explorer />

					<ReBox
						// component="footer"
						// sx={{
						// 	display: "flex",
						// 	flexDirection: "column",
						// 	alignItems: "center",
						// 	mb: 3,
						// 	pt: 2,
						// }}
					>
						<></>
					</ReBox>
				</Container>
		</Page>
	);
};

const PageComponent: NextPage = () => (
	<RekorClientProvider>
		<Home />
	</RekorClientProvider>
);
export default PageComponent;
