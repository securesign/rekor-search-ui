import React from "react";

// react-syntax-highlighter v16 loads ESM-only refractor deps that next/jest
// cannot transform (transformIgnorePatterns is ignored by next/jest). Tests do
// not assert on highlighting, so stub the highlighter to render code verbatim.
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
