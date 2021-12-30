import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";

interface Config {
  namespaces?: string[];
}

export default async function getPageProps(
  context: GetServerSidePropsContext | GetStaticPropsContext,
  config?: Config,
) {
  return {
    ...(await serverSideTranslations(context.locale ?? "en", ["common", ...(config?.namespaces ?? [])], {
      ...nextI18NextConfig,
      reloadOnPrerender: process.env.NODE_ENV === "development",
    })),
  };
}
