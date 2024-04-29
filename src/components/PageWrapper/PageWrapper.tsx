import React from "react";
import styles from "./PageWrapper.module.scss";
import { Allura } from "next/font/google";
import Link from "next/link";

const allura = Allura({ subsets: ["latin"], weight: "400" });

type PageWrapperProps = {
  isBlankBG?: boolean;
  children: React.ReactNode;
};
export default function PageWrapper(props: PageWrapperProps) {
  const getContainerClassName = () => {
    const toReturn = [styles.container];
    if (props.isBlankBG) {
      toReturn.push(styles.blankBG);
    }
    return toReturn.join(" ");
  };
  return (
    <div className={getContainerClassName()}>
      <header className={styles.header}>
        <span className={[allura.className, styles.appName].join(" ")}>
          gift gabble
        </span>
        <Link className={styles.navLink} href={"/about"}>
          about
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.centerContainer}>{props.children}</div>
      </main>
    </div>
  );
}
