import React from "react";
import { AppProps } from "next/app";
import "css/tailwind.css";
import "i18n";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}