import React from "react";
import _App from "next/app";
import "../global.scss";

class App extends _App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default App;
