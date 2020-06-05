import Head from "next/head";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scaffold</title>
      </Head>

      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
        <motion.div
          animate={{
            scale: [1.5, 1.5, 1],
            rotate: [90, 90, 0],
          }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
        >
          <img src="/icon.svg" className="h-32" alt="Lightbase" />
        </motion.div>

        <h1 className="heading text-6xl">Scaffold</h1>

        <p className="text-3xl text-gray-500">
          Let's get some work done!{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>
        </p>

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
