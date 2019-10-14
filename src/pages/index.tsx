import Head from "next/head";
import styles from "./index.scss";
import { ButtonLink } from "components/Button";
import { NextPage } from "next";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Scaffold</title>
    </Head>

    <div className={styles.root}>
      <img src="/icon.svg" className={styles.logo} />

      <h1 className={styles.heading}>Scaffold</h1>

      <p className={styles.description}>Let's get some work done! 🔥</p>

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
