import {
	createContext,
	FunctionComponent,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { RekorClient } from "rekor";
import getConfig from "next/config";

export interface RekorClientContext {
	client: RekorClient;
	baseUrl?: string;
	setBaseUrl: (_base: string | undefined) => void;
}

export const RekorClientContext = createContext<RekorClientContext | undefined>(
	undefined,
);

export const RekorClientProvider: FunctionComponent<PropsWithChildren<{}>> = ({
	children,
}) => {
	const [baseUrl, setBaseUrl] = useState<string>();
	const { publicRuntimeConfig } = getConfig();

	useEffect(() => {
		if (baseUrl === undefined) {
			if (publicRuntimeConfig.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN) {
				setBaseUrl(publicRuntimeConfig.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN);
			} else {
				setBaseUrl("https://rekor.sigstore.dev");
			}
		}
	}, [
		baseUrl,
		publicRuntimeConfig,
		publicRuntimeConfig.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN,
	]);

	const context: RekorClientContext = useMemo(() => {
		if (
			baseUrl === undefined &&
			publicRuntimeConfig.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN
		) {
			setBaseUrl(publicRuntimeConfig.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN);
		}

		return {
			client: new RekorClient({ BASE: baseUrl }),
			baseUrl,
			setBaseUrl,
		};
	}, [baseUrl, publicRuntimeConfig.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN]);

	return (
		<RekorClientContext.Provider value={context}>
			{children}
		</RekorClientContext.Provider>
	);
};

export function useRekorClient(): RekorClient {
	const ctx = useContext(RekorClientContext);

	if (!ctx) {
		throw new Error("Hook useRekorClient requires RekorClientContext.");
	}

	return ctx.client;
}

export function useRekorBaseUrl(): [
	RekorClientContext["baseUrl"],
	RekorClientContext["setBaseUrl"],
] {
	const ctx = useContext(RekorClientContext);

	if (!ctx) {
		throw new Error("Hook useRekorBaseUrl requires RekorClientContext.");
	}

	return [ctx.baseUrl, ctx.setBaseUrl];
}
