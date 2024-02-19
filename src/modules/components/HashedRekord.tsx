import { dump } from "js-yaml";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { RekorSchema } from "rekor";
import { decodex509 } from "../x509/decode";
import { Panel, Text } from "@patternfly/react-core";

export function HashedRekordViewer({
	hashedRekord,
}: {
	hashedRekord: RekorSchema;
}) {
	const certContent = window.atob(
		hashedRekord.signature.publicKey?.content || "",
	);

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
		<Panel style={{ paddingTop: "1em" }}>
			<Text
				component="h5"
				style={{ margin: "1em auto" }}
			>
				<Link
					href={`/?hash=${hashedRekord.data.hash?.algorithm}:${hashedRekord.data.hash?.value}`}
					passHref
				>
					Hash
				</Link>
			</Text>
			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{`${hashedRekord.data.hash?.algorithm}:${hashedRekord.data.hash?.value}`}
			</SyntaxHighlighter>

			<Text
				component="h5"
				style={{ margin: "1em auto" }}
			>
				Signature
			</Text>
			<SyntaxHighlighter
				language="text"
				style={atomDark}
			>
				{hashedRekord.signature.content || ""}
			</SyntaxHighlighter>

			<Text
				component="h5"
				style={{ margin: "1em auto" }}
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
