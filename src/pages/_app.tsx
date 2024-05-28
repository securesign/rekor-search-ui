import type { AppProps } from "next/app";
import "@patternfly/react-core/dist/styles/base.css";
import { NextPageContext } from "next";

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

App.getInitialProps = async (_ctx: NextPageContext) => {
	return {
		props: {
			NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN: process.env
				.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN
				? process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN
				: null,
		}, // gets passed to the page component as props
	};
};

export default App;
