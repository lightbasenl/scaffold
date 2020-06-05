import Head from "next/head";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scaffold</title>
      </Head>

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

        <h1 className="heading text-6xl">Scaffold</h1>

        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              translateY: "50%",
            },
            visible: {
              opacity: 1,
              translateY: 0,
            },
          }}
          initial="hidden"
          animate="visible"
          transition={{
            default: { delay: 3, duration: 0.5, ease: "easeInOut" },
            transform: { delay: 3, duration: 0.5, ease: "easeInOut" },
          }}
          className="text-3xl text-gray-500"
        >
          Let's get some work done!{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>
        </motion.p>

        <div className="h-16" />

        <div className="flex">
          <a href="https://github.com/lightbasenl/scaffold" className="button bg-blue-500">
            Documentation
          </a>
          <div className="w-3" />
          <a href="https://lightbase.nl/" className="button">
            About us
          </a>
        </div>
      </div>
    </>
  );
}
