import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import {
	Button,
	Flex,
	FlexItem,
	Masthead,
	MastheadContent,
	MastheadMain,
	Page,
	PageSection,
	Toolbar,
	ToolbarContent,
	ToolbarGroup,
	ToolbarItem,
} from "@patternfly/react-core";
import { RekorClientProvider } from "../modules/api/context";
import { Explorer } from "../modules/components/Explorer";
import { Settings } from "../modules/components/Settings";
import { CogIcon } from "@patternfly/react-icons";
import Link from "next/link";
import Image from "next/image";
import NOSSRWrapper from "../modules/utils/noSSR";
import logo from "/public/Logo-Red_Hat-Trusted_Artifact_Signer-A-Reverse-RGB.svg";

interface HomeProps {
	NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN?: string;
}

const Home: NextPage<HomeProps> = ({ NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN }) => {
	const [settingsOpen, setSettingsOpen] = useState(false);

	return (
		<RekorClientProvider initialDomain={NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN}>
			<Page
				header={
					<Masthead>
						<MastheadMain>
							<Link href={"/"}>
								<Image
									src={logo}
									alt={"Red Hat Trusted Artifact Signer logo"}
									priority={true}
									width={127}
									height={48}
								/>
							</Link>
						</MastheadMain>
						<MastheadContent>
							<Toolbar
								ouiaId="masthead-toolbar"
								id={"masthead-toolbar"}
								isFullHeight
								isStatic
							>
								<ToolbarContent id={"masthead-toolbar"}>
									<ToolbarGroup
										variant="icon-button-group"
										align={{ default: "alignRight" }}
										spacer={{ default: "spacerNone", md: "spacerMd" }}
									>
										<ToolbarGroup
											variant="icon-button-group"
											visibility={{ default: "hidden", lg: "visible" }}
										>
											<ToolbarItem>
												<Button
													aria-label="Settings"
													onClick={() => setSettingsOpen(true)}
													variant={"plain"}
													icon={<CogIcon />}
													ouiaId={"setting-button"}
													data-testid={"settings-button"}
												/>
											</ToolbarItem>
										</ToolbarGroup>
									</ToolbarGroup>
								</ToolbarContent>
							</Toolbar>
						</MastheadContent>
					</Masthead>
				}
			>
				<PageSection>
					<Head>
						<title>Rekor Search</title>
						<meta
							name="description"
							content="Search the Rekor public transparency log"
						/>
						<link
							rel="icon"
							href="/Logo-Red_Hat-Trusted_Artifact_Signer-A-Reverse-RGB.svg"
						/>
					</Head>

					<Settings
						open={settingsOpen}
						onClose={() => setSettingsOpen(false)}
					/>

					<Flex justifyContent={{ default: "justifyContentCenter" }}>
						<FlexItem style={{ width: "70vw" }}>
							<NOSSRWrapper>
								<Explorer />
							</NOSSRWrapper>
						</FlexItem>
					</Flex>
				</PageSection>
			</Page>
		</RekorClientProvider>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN:
				process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN || null,
		},
	};
};

export default Home;
