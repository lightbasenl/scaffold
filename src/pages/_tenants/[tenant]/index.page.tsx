import type { GetStaticPropsContext } from "next";

import Head from "next/head";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import { useAuthAnonymousBasedLogin } from "generated/authAnonymousBased/reactQueries";
import type { AuthTokenPairApi } from "generated/common/types";
import { useScaffoldCreateUser } from "generated/scaffold/reactQueries";

import { buildStaticPaths, getStaticPageProps } from "lib/pageProps";

import useFeatureFlag from "hooks/useFeatureFlag";

import LightbaseLogo from "assets/svg/logo.svg";
import { authCreateCookiesFromTokenPair } from "auth/cookies";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  if (typeof ctx.params?.tenant !== "string") {
    throw new Error("Tenant is required!");
  }

  return {
    props: {
      ...(await getStaticPageProps({ tenant: ctx.params?.tenant, locale: ctx.locale })),
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

      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
        <LightbaseLogo className="h-12 w-auto" />
        <div className="h-4" />

        <main id="main">
          <h1 className="heading text-6xl font-medium text-center">{t("common.appName")}</h1>
          {t("home.cta")}{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>
          <div className="h-16" />
          <div className="flex items-center justify-center">
            <a
              href="https://docs.lightba.se/frontend/scaffold"
              className="shadow-md bg-blue-500 py-4 px-6 rounded-lg text-blue-100 font-bold hover:bg-blue-600 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
            >
              {t("home.docs")}
            </a>
            <div className="w-3" />
            <a
              href="https://lightbase.nl/"
              className="border shadow-md bg-white py-4 px-6 rounded-lg text-gray-700 font-bold hover:bg-gray-100 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
            >
              {t("home.aboutUs")}
            </a>
            <div className="w-3" />
            <button
              data-test="index.login"
              className="border shadow-md bg-white py-4 px-6 rounded-lg text-gray-700 font-bold hover:bg-gray-100 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
              onClick={scaffoldCreateUser}
            >
              {t("home.login")}
            </button>
          </div>
          <p>{JSON.stringify(flags, null, 2)}</p>
        </main>
      </div>
    </>
  );
}
