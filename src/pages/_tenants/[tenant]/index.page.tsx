import type { GetStaticPropsContext } from "next";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import { useAuthMe } from "generated/auth/reactQueries";
import { useAuthAnonymousBasedLogin } from "generated/authAnonymousBased/reactQueries";
import type { AuthTokenPairApi } from "generated/common/types";
import { useScaffoldCreateUser } from "generated/scaffold/reactQueries";

import { buildStaticPaths, getPageProps } from "lib/pageProps";

import useFeatureFlag from "hooks/useFeatureFlag";

import { SvgLogo } from "assets/svg";
import { authCreateCookiesFromTokenPair } from "auth/cookies";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  if (typeof ctx.params?.tenant !== "string") {
    throw new Error("Tenant is required!");
  }

  return {
    props: {
      ...(await getPageProps({ tenant: ctx.params?.tenant, locale: ctx.locale })),
    },
  };
};

export async function getStaticPaths() {
  const pageTree = buildStaticPaths([{}]);

  return {
    paths: pageTree,
    fallback: "blocking",
  };
}

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const flags = useFeatureFlag();
  const { data: user } = useAuthMe();

  const { mutate: anonymousBasedLogin } = useAuthAnonymousBasedLogin({
    onSuccess(data: AuthTokenPairApi) {
      authCreateCookiesFromTokenPair(data);
      router.push("/private");
    },
  });

  const { mutate: scaffoldCreateUser } = useScaffoldCreateUser({
    onSuccess(data) {
      anonymousBasedLogin({
        body: {
          token: data.loginToken,
        },
      });
    },
  });

  return (
    <>
      <Head>
        <title>{t("common.appName")}</title>
      </Head>

      <a href="#main" className="sr-only focus:not-sr-only">
        {t("common.skipToContent")}
      </a>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <SvgLogo className="h-12 w-auto" />
        <div className="h-4" />

        <main id="main">
          <h1 className="heading text-center text-6xl font-medium">{t("common.appName")}</h1>
          {t("home.cta")}{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>
          <div className="h-16" />
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://docs.lightba.se/frontend/scaffold"
              className="rounded-lg bg-blue-500 py-4 px-6 font-bold text-blue-100 shadow-md ring-blue-600 ring-offset-2 hover:bg-blue-600 hover:underline focus:outline-none focus:ring-2"
            >
              {t("home.docs")}
            </a>
            <a
              href="https://lightbase.nl/"
              className="rounded-lg border bg-white py-4 px-6 font-bold text-gray-700 shadow-md ring-blue-600 ring-offset-2 hover:bg-gray-100 hover:underline focus:outline-none focus:ring-2"
            >
              {t("home.aboutUs")}
            </a>
            <button
              data-test="index.login"
              className="rounded-lg border bg-white py-4 px-6 font-bold text-gray-700 shadow-md ring-blue-600 ring-offset-2 hover:bg-gray-100 hover:underline focus:outline-none focus:ring-2"
              onClick={() => {
                if (user) {
                  return router.push("/private");
                } else {
                  scaffoldCreateUser({});
                }
              }}
            >
              {t("home.login")}
            </button>
            <Link
              href="/login"
              className="rounded-lg border bg-white py-4 px-6 font-bold text-gray-700 shadow-md ring-blue-600 ring-offset-2 hover:bg-gray-100 hover:underline focus:outline-none focus:ring-2"
            >
              {t("home.loginAccount")}
            </Link>
          </div>
          <p>
            {JSON.stringify(
              {
                flags,
                user,
              },
              null,
              2,
            )}
          </p>
        </main>
      </div>
    </>
  );
}
