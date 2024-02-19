import { dump } from "js-yaml";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IntotoV002Schema } from "rekor";
import { decodex509 } from "../x509/decode";
import { Panel, Text } from "@patternfly/react-core";

export function IntotoViewer({ intoto }: { intoto: IntotoV002Schema }) {
	const signature = intoto.content.envelope?.signatures[0];
	const certContent = window.atob(signature?.publicKey || "");

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
				component="h5"
				style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}
			>
				<Link
					href={`/?hash=${intoto.content.payloadHash?.algorithm}:${intoto.content.payloadHash?.value}`}
				>
					Hash
				</Link>
			</Text>

			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{`${intoto.content.payloadHash?.algorithm}:${intoto.content.payloadHash?.value}`}
			</SyntaxHighlighter>

			<Text
				component="h5"
				style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}
			>
				Signature
			</Text>
			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{window.atob(signature?.sig || "")}
			</SyntaxHighlighter>
			<Text
				component="h5"
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
