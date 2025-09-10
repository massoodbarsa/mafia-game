// pages/_app.tsx
import "../app/globals.css"; // your globals.css from app folder
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
