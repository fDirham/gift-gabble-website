"use client";

import styles from "./page.module.scss";
import LandingContent from "@/components/content/LandingContent";
import Link from "next/link";
import { Allura } from "next/font/google";
import useFormResponse from "@/hooks/useFormResponse";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IdeaObj } from "@/utilities/customTypes";
import { DUMMY_IDEA_LIST } from "@/dummy/dummyIdeaList";
import IdeaListRender from "@/components/IdeaListRender";

const allura = Allura({ subsets: ["latin"], weight: "400" });

export default function IdeasPage() {
  const formResponse = useFormResponse();
  const [ideaList, setIdeaList] = useState<IdeaObj[]>(DUMMY_IDEA_LIST);

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
        <div className={styles.centerContainer}>
          <h1 className={styles.title}>
            Here are some ideas for your{" "}
            <span className={[allura.className, styles.whoText].join(" ")}>
              {formResponse.who}
            </span>
          </h1>
          <h2 className={styles.subtitle}>
            Click the idea you like the most for shopping options.
          </h2>
          <IdeaListRender ideaList={ideaList} />
        </div>
      </main>
    </div>
  );
}
