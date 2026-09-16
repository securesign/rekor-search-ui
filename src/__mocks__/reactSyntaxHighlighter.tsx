import React from "react";

const SyntaxHighlighter = ({ children }: { children?: React.ReactNode }) => (
	<pre>{children}</pre>
);

export const Prism = SyntaxHighlighter;
export const Light = SyntaxHighlighter;
export const LightAsync = SyntaxHighlighter;
export const PrismLight = SyntaxHighlighter;
export const PrismAsync = SyntaxHighlighter;
export const PrismAsyncLight = SyntaxHighlighter;

export default SyntaxHighlighter;
