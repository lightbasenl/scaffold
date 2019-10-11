import Head from "next/head";
import styles from "./styles.scss";

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>

    <div className={styles.root}>
      <img src="/icon.svg" className={styles.logo} />

      <h1 className={styles.heading}>Scaffold</h1>

      <p className={styles.description}>Let's get some work done! 🔥</p>
    </div>
  </>
);

export default Home;
