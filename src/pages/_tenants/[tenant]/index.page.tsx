import type { GetStaticPropsContext } from "next";

import Head from "next/head";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import { useAuthMe } from "generated/auth/reactQueries";
import { useAuthAnonymousBasedLogin } from "generated/authAnonymousBased/reactQueries";
import type { AuthTokenPair } from "generated/common/types";
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
    onSuccess(data: AuthTokenPair) {
      authCreateCookiesFromTokenPair(data);
      router.push("/private");
    },
  });

  const { mutate: scaffoldCreateUser } = useScaffoldCreateUser({
    onSuccess(data) {
      anonymousBasedLogin({
        token: data.loginToken,
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

      <div className="isolate bg-white">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="px-6 pt-6 lg:px-8">
          <div>
            <nav className="flex h-9 items-center justify-between">
              <div className="flex lg:min-w-0 lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">{t("common:appName")}</span>
                  <SvgLogo className="mx-auto h-12 w-auto" aria-label="Lightbase" />
                </a>
              </div>

              <div className="flex lg:min-w-0 lg:flex-1 lg:justify-end">
                <a
                  href="/login"
                  data-test="index.login"
                  className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  {t("home.login")}
                </a>
              </div>
            </nav>
          </div>
        </div>

        <main id="main">
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-3xl pb-32 pt-20 sm:pb-40 sm:pt-48">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  {t("common.appName")}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">{t("home.description")}</p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a
                    href="https://docs.lightba.se/frontend/scaffold"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    {t("home.docs")}
                  </a>
                  <a
                    href="https://lightbase.nl/"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    {t("home.aboutUs")}
                  </a>
                </div>
              </div>

              <div className="my-8 flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full px-4 py-1.5 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    <p>
                      Current feature flags:{" "}
                      {JSON.stringify(
                        {
                          flags,
                          user,
                        },
                        null,
                        2,
                      )}
                    </p>
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
