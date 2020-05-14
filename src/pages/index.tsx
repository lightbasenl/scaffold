import Head from "next/head";
import { NextPage } from "next";
import styles from "./index.module.scss";
import { ButtonLink } from "components/Button";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Scaffold Branch Deployment</title>
    </Head>

    <div className={styles.root}>
      <img src="/icon.svg" className={styles.logo} alt="Lightbase" />

      <h1 className={styles.heading}>Scaffold</h1>

      <p className={styles.description}>
        Let's get some work done!{" "}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </p>

      <div className={styles.buttonContainer}>
        <ButtonLink
          href="https://github.com/lightbasenl/scaffold"
          variantColor="blue"
          className={styles.getStartedButton}
        >
          Documentation
        </ButtonLink>
        <ButtonLink href="http://lightbase.nl">About us</ButtonLink>
      </div>
    </div>
  </>
);

export default Home;
