import React from "react";
import styles from "./PageWrapper.module.scss";
import { Allura } from "next/font/google";
import Link from "next/link";

const allura = Allura({ subsets: ["latin"], weight: "400" });

type PageWrapperProps = {
  isBlankBG?: boolean;
  children: React.ReactNode;
  centerContainerClassName?: string;
};
export default function PageWrapper(props: PageWrapperProps) {
  const getContainerClassName = () => {
    const toReturn = [styles.container];
    if (props.isBlankBG) {
      toReturn.push(styles.blankBG);
    }
    return toReturn.join(" ");
  };

  const getCenterContainerClassName = () => {
    const toReturn = [styles.centerContainer];
    if (props.centerContainerClassName) {
      toReturn.push(props.centerContainerClassName);
    }
    return toReturn.join(" ");
  };

  // TODO: Center container class name props
  return (
    <div className={getContainerClassName()}>
      <header className={styles.header}>
        <Link href={"/"} className="hiddenLink">
          <span className={[allura.className, styles.appName].join(" ")}>
            gift gabble
          </span>
        </Link>

        <Link className={styles.navLink} href={"/about"}>
          about
        </Link>
      </header>
      <main className={styles.main}>
        <div className={getCenterContainerClassName()}>{props.children}</div>
      </main>
    </div>
  );
}
