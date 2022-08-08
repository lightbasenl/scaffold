import Head from "next/head";
import { useRouter } from "next/router";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";

import { useAuthLogout, useAuthMe } from "generated/auth/reactQueries";

import { defaultServerSideProps } from "lib/serverSideHelpers";

import useFeatureFlag from "hooks/useFeatureFlag";

import { SvgLogo } from "assets/svg";
import { authRemoveCookies } from "auth/cookies";

export const getServerSideProps = defaultServerSideProps({
  authDescription: {
    enforceSessionType: "user",
    enforceLoginType: "anonymousBased",
  },
  namespaces: ["private", "public"],
});

export default function Home() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  const { data: auth } = useAuthMe();
  const flags = useFeatureFlag();

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
        <SvgLogo className="h-12 w-auto" />

        <main id="main">
          <h1 className="heading text-6xl font-medium text-center">{t("private:common.appName")}</h1>
          <div className="h-16" />
          <div className="flex items-center justify-center">
            <div className="w-3" />
            <button
              data-test="private.index.logout"
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
