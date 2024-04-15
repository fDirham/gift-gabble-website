import HeroPerson from "@/components/HeroPerson/HeroPerson";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <header></header>
      <main className={styles.main}>
        <div className={styles.centerContainer}>
          <div className={styles.hero}>
            <h2 className={styles.heroTitle}>
              FIND A <b>GIFT</b> FOR YOUR
            </h2>
            <HeroPerson />
            <h2 className={styles.heroTitle}>
              IN <b>SECONDS</b>
            </h2>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
