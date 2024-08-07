import { dump, load } from "js-yaml";
import Link from "next/link";
import { Convert } from "pvtsutils";
import { Fragment, ReactNode, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
	DSSEV001Schema,
	IntotoV001Schema,
	IntotoV002Schema,
	LogEntry,
	RekorSchema,
} from "rekor";
import { toRelativeDateString } from "../utils/date";
import { DSSEViewer } from "./DSSE";
import { HashedRekordViewer } from "./HashedRekord";
import { IntotoViewer001 } from "./Intoto001";
import { IntotoViewer002 } from "./Intoto002";
import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionToggle,
	Card,
	CardBody,
	Divider,
	Flex,
	FlexItem,
	Grid,
	GridItem,
	Panel,
	Text,
	TextVariants,
} from "@patternfly/react-core";

const DUMP_OPTIONS: jsyaml.DumpOptions = {
	replacer: (key, value) => {
		if (Convert.isBase64(value)) {
			try {
				return load(window.atob(value));
			} catch (e) {
				return value;
			}
		}
		return value;
	},
};

/**
 * Return a parsed JSON object of the provided content.
 * If an error occurs, the provided content is returned as a raw string.
 */
function tryJSONParse(content?: string): unknown {
	if (!content) {
		return content;
	}
	try {
		return JSON.parse(content);
	} catch (e) {
		return content;
	}
}

export function EntryCard({
	title,
	content,
	dividerProps = {},
}: {
	title: ReactNode;
	content: ReactNode;
	dividerProps?: { display?: string };
}) {
	return (
		<Flex style={{ padding: "1em" }}>
			<Divider
				orientation={{
					default: "vertical",
				}}
				style={{ margin: "inherit 1em", ...dividerProps }}
			/>
			<FlexItem>
				<Text component={TextVariants.h3}>{title}</Text>
				<Text
					component={TextVariants.p}
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "flex",
						alignItems: "center",
						justifyContent: "start",
					}}
				>
					{content}
				</Text>
			</FlexItem>
		</Flex>
	);
}

export function Entry({ entry }: { entry: LogEntry }) {
	const [uuid, obj] = Object.entries(entry)[0];
	const [expanded, setExpanded] = useState([""]);

	const toggle = (id: string) => {
		const index = expanded.indexOf(id);
		const newExpanded: string[] =
			index >= 0
				? [
						...expanded.slice(0, index),
						...expanded.slice(index + 1, expanded.length),
					]
				: [...expanded, id];
		setExpanded(newExpanded);
	};

	const body = JSON.parse(window.atob(obj.body)) as {
		kind: string;
		apiVersion: string;
		spec: unknown;
	};

	// Extract the JSON payload of the attestation. Some attestations appear to be
	// double Base64 encoded. This loop will attempt to extract the content, with
	// a max depth as a safety gap.
	let rawAttestation = obj.attestation?.data as string | undefined;
	for (let i = 0; Convert.isBase64(rawAttestation) && i < 3; i++) {
		rawAttestation = window.atob(rawAttestation);
	}
	const attestation = tryJSONParse(rawAttestation);

	let parsed: ReactNode | undefined;
	switch (body.kind) {
		case "hashedrekord":
			parsed = <HashedRekordViewer hashedRekord={body.spec as RekorSchema} />;
			break;
		case "intoto":
			if (body.apiVersion == "0.0.1") {
				parsed = <IntotoViewer001 intoto={body.spec as IntotoV001Schema} />;
				break;
			} else {
				parsed = <IntotoViewer002 intoto={body.spec as IntotoV002Schema} />;
				break;
			}
		case "dsse":
			parsed = <DSSEViewer dsse={body.spec as DSSEV001Schema} />;
			break;
	}

	return (
		<Card style={{ margin: "1.5em auto 2em" }}>
			<CardBody>
				<Text
					component={TextVariants.h2}
					style={{
						margin: "1.25em auto",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					Entry UUID:{" "}
					<Link
						href={`/?uuid=${uuid}`}
						passHref
					>
						{uuid}
					</Link>
				</Text>
				<Divider />
				<Grid hasGutter={true}>
					<GridItem sm={3}>
						<EntryCard
							title="Type"
							content={body.kind}
							dividerProps={{ display: "none" }}
						/>
					</GridItem>
					<GridItem sm={3}>
						<EntryCard
							title="Log Index"
							content={
								<Link
									href={`/?logIndex=${obj.logIndex}`}
									passHref
								>
									{obj.logIndex}
								</Link>
							}
						/>
					</GridItem>
					<GridItem sm={6}>
						<EntryCard
							title="Integrated time"
							content={toRelativeDateString(
								new Date(obj.integratedTime * 1000),
							)}
						/>
					</GridItem>
				</Grid>
				<Divider />
				{parsed}
				<Panel
					style={{
						margin: "0.75em auto",
					}}
				>
					<Fragment>
						<Accordion>
							<>
								<AccordionItem>
									<AccordionToggle
										id={"body-header"}
										aria-controls="body-content"
										isExpanded={!parsed}
										onClick={() => {
											toggle("body-content");
										}}
									>
										<Text>Raw Body</Text>
									</AccordionToggle>
									<AccordionContent
										isHidden={!expanded.includes("body-content")}
									>
										<SyntaxHighlighter
											language="yaml"
											style={atomDark}
										>
											{dump(body, DUMP_OPTIONS)}
										</SyntaxHighlighter>
									</AccordionContent>
								</AccordionItem>
								{attestation && (
									<AccordionItem>
										<AccordionToggle
											aria-controls="attestation-content"
											id="attestation-header"
											isExpanded={!parsed}
											onClick={() => {
												toggle("attestation-content");
											}}
										>
											<Text>Attestation</Text>
										</AccordionToggle>
										<AccordionContent
											isHidden={!expanded.includes("attestation-content")}
										>
											<SyntaxHighlighter
												language="yaml"
												style={atomDark}
											>
												{dump(attestation)}
											</SyntaxHighlighter>
										</AccordionContent>
									</AccordionItem>
								)}
								{obj.verification && (
									<AccordionItem>
										<AccordionToggle
											aria-controls="verification-content"
											id={"verification-header"}
											isExpanded={!parsed}
											onClick={() => {
												toggle("verification-content");
											}}
										>
											<Text>Verification</Text>
										</AccordionToggle>
										<AccordionContent
											isHidden={!expanded.includes("verification-content")}
										>
											<SyntaxHighlighter
												language="yaml"
												style={atomDark}
											>
												{dump(obj.verification)}
											</SyntaxHighlighter>
										</AccordionContent>
									</AccordionItem>
								)}
							</>
						</Accordion>
					</Fragment>
				</Panel>
			</CardBody>
		</Card>
	);
}
