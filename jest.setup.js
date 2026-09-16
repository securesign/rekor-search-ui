// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN = "https://rekor.sigstore.dev";

Object.assign(global, { TextDecoder, TextEncoder });
