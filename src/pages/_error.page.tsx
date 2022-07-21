import type { NextPageContext } from "next";

import Router from "next/router";

Error.getInitialProps = async ({ res, err, locale, defaultLocale }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const resolvedLocalePart = locale === defaultLocale ? "" : `/${locale}`;

  if (res) {
    // On the server, we'll use an HTTP response to
    // redirect with the status code of our choice.
    // 307 is for temporary redirects.
    res.writeHead(307, {
      Location: `${resolvedLocalePart}/${statusCode}`,
    });
    res.end();
  } else {
    // On the client, we'll use the Router-object
    // from the 'next/router' module.
    Router.replace(`${resolvedLocalePart}/${statusCode}`);
  }
};

function Error() {
  return null;
}

export default Error;
