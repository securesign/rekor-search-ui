import { dump } from "js-yaml";
import NextLink from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IntotoV001Schema } from "rekor";
import { decodex509 } from "../x509/decode";
import { Panel, Text, TextVariants } from "@patternfly/react-core";

export function IntotoViewer001({ intoto }: { intoto: IntotoV001Schema }) {
	const certContent = window.atob(intoto.publicKey || "");

	const publicKey = {
		title: "Public Key",
		content: certContent,
	};
	if (certContent.includes("BEGIN CERTIFICATE")) {
		publicKey.title = "Public Key Certificate";
		publicKey.content = dump(decodex509(certContent), {
			noArrayIndent: true,
			lineWidth: -1,
		});
	}

	return (
		<Panel>
			<Text
				component={TextVariants.h5}
				style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}
			>
				<NextLink
					href={`/?hash=${intoto.content.payloadHash?.algorithm}:${intoto.content.payloadHash?.value}`}
					passHref
				>
					Hash
				</NextLink>
			</Text>

			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{`${intoto.content.payloadHash?.algorithm}:${intoto.content.payloadHash?.value}`}
			</SyntaxHighlighter>

			<Text
				component={TextVariants.h5}
				style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}
			>
				Signature
			</Text>
			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{"Missing for intoto v0.0.1 entries"}
			</SyntaxHighlighter>
			<Text
				component={TextVariants.h5}
				style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}
			>
				{publicKey.title}
			</Text>
			<SyntaxHighlighter
				language="yaml"
				style={atomDark}
			>
				{publicKey.content}
			</SyntaxHighlighter>
		</Panel>
	);
}
