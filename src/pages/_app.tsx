import type { AppProps } from "next/app";
import "@patternfly/react-core/dist/styles/base.css";

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default App;
