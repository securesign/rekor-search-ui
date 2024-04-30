import { Fragment } from "react";
import dynamic from "next/dynamic";

const NoSSRWrapper = (props: any) => <Fragment>{props.children}</Fragment>;
export default dynamic(() => Promise.resolve(NoSSRWrapper), { ssr: false });
