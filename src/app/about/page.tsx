import React from "react";
import styles from "./page.module.scss";
import { Allura } from "next/font/google";
import Link from "next/link";

const allura = Allura({ subsets: ["latin"], weight: "400" });

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={[allura.className, styles.appName].join(" ")}>
          gift gabble
        </span>
        <Link className={styles.navLink} href={"/"}>
          home
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.contentContainer}>
          <h1>about</h1>
          <p>
            Use Gift Gabble to find gift ideas for your loved ones! Simply fill
            in a short form and we'll take care of the rest.{" "}
          </p>
          <p>
            Using AI, we'll find gift ideas that we think your loved one will
            like + links to amazon product pages for those ideas.
          </p>
          <a href="mailto:fbdlabs@outlook.com">Contact</a>
        </div>
      </main>
    </div>
  );
}
