"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import { useState } from "react";
import { IdeaObj } from "@/utilities/customTypes";
import { DUMMY_IDEA_LIST } from "@/dummy/dummyIdeaList";
import IdeaListRender from "@/components/IdeaListRender";
import PageWrapper from "@/components/PageWrapper";
import { Amaranth } from "next/font/google";
import useScreenDevice from "@/hooks/useScreenDevice";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export default function IdeasPage() {
  const formResponse = useFormResponse();
  const [ideaList, setIdeaList] = useState<IdeaObj[]>(DUMMY_IDEA_LIST);
  const screenDevice = useScreenDevice();

  const disclaimerText = screenDevice.isMobile
    ? "Preview images are not perfect, tap an idea for more accurate results"
    : "Preview images are not perfect, click an idea for more accurate results";

  return (
    <PageWrapper isBlankBG>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Here are some ideas for your{" "}
          <span className={[amaranth.className, styles.whoText].join(" ")}>
            {formResponse.who}.
          </span>
        </h1>
        <h2 className={styles.subtitle}>
          Click the idea you like the most for <b>all</b> shopping options.
        </h2>
        <p className={styles.disclaimerText}>{disclaimerText}</p>
        <IdeaListRender ideaList={ideaList} />
      </div>
    </PageWrapper>
  );
}
