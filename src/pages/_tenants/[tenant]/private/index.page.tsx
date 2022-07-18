import { authRemoveCookies } from "auth/cookies";
import type { GetServerSidePropsContext } from "next";

import Head from "next/head";

import { useTranslation } from "next-i18next";

import { useAuthLogout, useAuthMe } from "generated/auth/reactQueries";

import { getStaticPageProps } from "lib/pageProps";

import useFeatureFlag from "hooks/useFeatureFlag";

import LightbaseLogo from "assets/svg/logo.svg";
import useAuthenticate from "auth/useAuthenticate";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (typeof ctx.params?.tenant !== "string") {
    throw new Error("Tenant is required!");
  }

  return {
    props: {
      ...(await getStaticPageProps({
        tenant: ctx.params.tenant,
        locale: ctx.locale,
        namespaces: ["private", "public"],
      })),
    },
  };
}

export default function Home() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  const { data: auth } = useAuthMe();
  const flags = useFeatureFlag();

  useAuthenticate();

  const { mutate: authLogout } = useAuthLogout({
    onSuccess() {
      authRemoveCookies();
      queryClient.clear();

      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>{t("private:common.appName")}</title>
      </Head>

      <a href="#main" className="sr-only focus:not-sr-only">
        {t("common.skipToContent")}
      </a>

      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
        <LightbaseLogo className="h-12 w-auto" />

        <main id="main">
          <h1 className="heading text-6xl font-medium text-center">{t("private:common.appName")}</h1>
          <div className="h-16" />
          <div className="flex items-center justify-center">
            <div className="w-3" />
            <button
              className="border shadow-md bg-white py-4 px-6 rounded-lg text-gray-700 font-bold hover:bg-gray-100 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
              onClick={authLogout}
            >
              {t("home.logout")}
            </button>
          </div>
          <p>
            {JSON.stringify(
              {
                auth,
                flags,
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
