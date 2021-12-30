import Head from "next/head";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { GetStaticPropsContext } from "next";
import getPageProps from "lib/getPageProps";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      ...(await getPageProps(context, {
        namespaces: ["home"],
      })),
    },
  };
};

export default function Home() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <>
      <Head>
        <title>{t("common:appName")}</title>
      </Head>

      <a href="#main" className="sr-only focus:not-sr-only">
        {t("common:skipToContent")}
      </a>

      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
        <motion.svg className="h-48" viewBox="0 0 241 335" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M87.657 15.884c-19.822-19.845-51.965-19.845-71.789 0-19.824 19.846-19.824 52.023 0 71.869l35.93 35.97.105-.103L95.236 167 167 95.158 87.657 15.884z"
            variants={{
              hidden: {
                stroke: "#FF5B4B",
                strokeWidth: 2,
                fill: "rgba(255, 91, 75, 0)",
              },
              visible: {
                stroke: "#FF5B4B",
                strokeWidth: 2,
                fill: "rgba(255, 91, 75, 1)",
              },
            }}
            initial="hidden"
            animate="visible"
            transition={{
              default: { delay: 1, duration: 1, ease: "easeInOut" },
              fill: { delay: 1, duration: 1, ease: [1, 0, 0.8, 1] },
            }}
          />
          <motion.path
            d="M51.798 210.28l-35.93 35.968c-19.824 19.847-19.824 52.023 0 71.867 19.823 19.847 51.965 19.847 71.788 0l.912-.91.077.078L167 238.843 95.237 167l-43.335 43.382-.104-.102z"
            variants={{
              hidden: {
                stroke: "#0F6EFC",
                strokeWidth: 2,
                fill: "rgba(15, 110, 252, 0)",
              },
              visible: {
                stroke: "#0F6EFC",
                strokeWidth: 2,
                fill: "rgba(15, 110, 252, 1)",
              },
            }}
            initial="hidden"
            animate="visible"
            transition={{
              default: { delay: 2, duration: 1, ease: "easeInOut" },
              fill: { delay: 2, duration: 1, ease: [1, 0, 0.8, 1] },
            }}
          />
          <motion.path
            d="M95.237 167L167 238.843 238.763 167 167 95.158z"
            variants={{
              hidden: {
                stroke: "#292949",
                strokeWidth: 2,
                fill: "rgba(41, 41, 73, 0)",
              },
              visible: {
                stroke: "#292949",
                strokeWidth: 2,
                fill: "rgba(41, 41, 73, 1)",
              },
            }}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 1, ease: "easeInOut" },
              fill: { duration: 1, ease: [1, 0, 0.8, 1] },
            }}
          />
        </motion.svg>

        <div className="h-4" />

        <main id="main">
          <h1 className="heading text-6xl font-medium text-center">{t("common:appName")}</h1>

          <motion.p
            variants={{
              hidden: {
                opacity: "0",
                translateY: "50%",
              },
              visible: {
                opacity: "1",
                translateY: "0%",
              },
            }}
            initial="hidden"
            animate="visible"
            transition={{
              default: { delay: 3, duration: 0.5, ease: "easeInOut" },
              transform: { delay: 3, duration: 0.5, ease: "easeInOut" },
            }}
            className="text-3xl text-gray-500 mt-3 text-center"
          >
            {t("cta")}{" "}
            <span role="img" aria-label="fire">
              🔥
            </span>
          </motion.p>

          <div className="h-16" />

          <div className="flex items-center justify-center">
            <a
              href="https://docs.lightba.se/frontend/scaffold"
              className="shadow-md bg-blue-500 py-4 px-6 rounded-lg text-blue-100 font-bold hover:bg-blue-600 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
            >
              Documentation
            </a>
            <div className="w-3" />
            <a
              href="https://lightbase.nl/"
              className="border shadow-md bg-white py-4 px-6 rounded-lg text-gray-700 font-bold hover:bg-gray-100 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
            >
              About us
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
