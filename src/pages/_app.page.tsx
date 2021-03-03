import React from "react";
import { AppProps } from "next/app";
import "css/tailwind.css";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
