import { dump } from "js-yaml";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { RekorSchema } from "rekor";
import { decodex509 } from "../x509/decode";
import { Panel, Text, TextVariants } from "@patternfly/react-core";
import { Name } from "@peculiar/x509";

interface DecodedCert {
	data: {
		"Serial Number": string;
	};
	Signature: {
		Issuer: string;
		Validity: {
			"Not Before": string;
			"Not After": string;
		};
		Algorithm: Algorithm;
		Subject: Name;
	};
	"X509v3 extensions": Record<string, string | object>; // extensions can be strings or objects
}

function arrayBufferToString(buffer: ArrayBuffer) {
	const decoder = new TextDecoder("utf-8");
	return decoder.decode(buffer);
}

export function HashedRekordViewer({
	hashedRekord,
}: {
	hashedRekord: RekorSchema;
}) {
	const certContent = window.atob(
		hashedRekord.signature.publicKey?.content || "",
	);

	const decodedCert: DecodedCert = decodex509(certContent);

	// check and handle ArrayBuffer in extensions (if any)
	for (const key in decodedCert["X509v3 extensions"]) {
		const value = decodedCert["X509v3 extensions"][key];
		if (value instanceof ArrayBuffer) {
			decodedCert["X509v3 extensions"][key] = arrayBufferToString(value);
		}
	}

	// default to treating it as a public key
	const publicKey = {
		title: "Public Key",
		content: certContent,
	};

	// only treat as a certificate if "BEGIN CERTIFICATE" is found
	if (certContent.includes("BEGIN CERTIFICATE")) {
		publicKey.title = "Public Key Certificate";
		publicKey.content = dump(decodex509(certContent), {
			noArrayIndent: true,
			lineWidth: -1,
		});
	}

	return (
		<Panel style={{ marginTop: "1.25em" }}>
			<Text
				component={TextVariants.h5}
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
				component={TextVariants.h5}
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
				component={TextVariants.h5}
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
