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

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <SvgLogo className="h-12 w-auto" />

        <main id="main">
          <h1 className="heading text-center text-6xl font-medium">{t("private:common.appName")}</h1>
          <div className="h-16" />
          <div className="flex items-center justify-center">
            <div className="w-3" />
            <button
              data-test="private.index.logout"
              className="rounded-lg border bg-white py-4 px-6 font-bold text-gray-700 shadow-md ring-blue-600 ring-offset-2 hover:bg-gray-100 hover:underline focus:outline-none focus:ring-2"
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
