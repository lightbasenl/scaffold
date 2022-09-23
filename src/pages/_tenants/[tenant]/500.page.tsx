import type { GetStaticPropsContext } from "next";

import Head from "next/head";
import Link from "next/link";

import { useTranslation } from "next-i18next";

import { buildStaticPaths, getPageProps } from "lib/pageProps";

import { SvgLogo } from "assets/svg";

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

export default function FiveOo() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("errorPages.500.metaTitle")}</title>
      </Head>
      <div className="flex h-screen flex-col bg-white pt-16 pb-12">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-shrink-0 justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">{t("common.appName")}</span>
              <SvgLogo className="h-12 w-auto" />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-wide">500 error</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {t("errorPages.500.title")}
              </h1>
              <p className="mt-2 text-base text-gray-500">{t("errorPages.500.description")}</p>
              <div className="mt-6">
                <Link href="/">
                  <a className="text-primary-600 hover:text-primary-500 text-base font-medium">
                    {t("errorPages.500.goBack")}
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
