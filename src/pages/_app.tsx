import React from "react";
import { AppProps } from "next/app";
import "css/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
