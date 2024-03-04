import Document, { Head, Html, Main, NextScript } from "next/document";

const nextPublicENV = Object.keys(process.env)
	.filter(key => key.startsWith("NEXT_PUBLIC_"))
	.reduce(
		(env, key) => {
			env[key] = process.env[key] ?? "";
			return env;
		},
		{} as { [key: string]: string },
	);

class AppDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head></Head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            console.table(${JSON.stringify(nextPublicENV)});
		        window.process = window.process || {};
		        window.process.env = window.process.env || {};
			      Object.assign(window.process.env, ${JSON.stringify(nextPublicENV)});
            `,
					}}
				></script>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default AppDocument;
