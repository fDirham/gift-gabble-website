"use client";

import styles from "./page.module.scss";
import LandingContent from "@/components/content/LandingContent";
import Link from "next/link";
import { Allura } from "next/font/google";
import useFormResponse from "@/hooks/useFormResponse";
import { useEffect } from "react";

const allura = Allura({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const formResponse = useFormResponse();

  async function handleSearch() {
    // TODO
    console.log(formResponse.who);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={[allura.className, styles.appName].join(" ")}>
          gift gabble
        </span>
        <Link className={styles.navLink} href={"/about"}>
          about
        </Link>
      </header>
      <main className={styles.main}>
        <LandingContent handleSearch={handleSearch} />
      </main>
    </div>
  );
}
