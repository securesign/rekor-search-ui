import { dump } from "js-yaml";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DSSEV001Schema } from "rekor";
import { decodex509 } from "../x509/decode";
import { Panel, Text, TextVariants } from "@patternfly/react-core";

export function DSSEViewer({ dsse }: { dsse: DSSEV001Schema }) {
	const sig = dsse.signatures?.[0];
	const certContent = window.atob(sig?.verifier || "");

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
				style={{ paddingTop: "1em" }}
			>
				<Link
					href={`/?hash=${dsse.payloadHash?.algorithm}:${dsse.payloadHash?.value}`}
					passHref
				>
					Hash
				</Link>
			</Text>

			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{`${dsse.payloadHash?.algorithm}:${dsse.payloadHash?.value}`}
			</SyntaxHighlighter>

			<Text
				component={TextVariants.h5}
				style={{ paddingTop: "1em" }}
			>
				Signature
			</Text>
			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{sig?.signature || ""}
			</SyntaxHighlighter>
			<Text
				component={TextVariants.h5}
				style={{ paddingTop: "1em" }}
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
