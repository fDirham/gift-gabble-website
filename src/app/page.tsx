"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import SearchForm from "@/components/SearchForm";
import HeroPerson from "@/components/HeroPerson";

export default function Home() {
  const router = useRouter();

  async function handleSearch() {
    router.push("/ideas");
  }

  return (
    <PageWrapper>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          FIND A <b>GIFT</b> FOR YOUR
        </h1>
        <HeroPerson />
        <h1 className={styles.heroTitle}>
          IN <b>SECONDS</b>
        </h1>
      </div>

      <span className={styles.explainText}>
        Fill the form below to get free gift ideas! <br />
        {"No sign ups required!"}
      </span>
      <SearchForm onGo={handleSearch} />
    </PageWrapper>
  );
}
