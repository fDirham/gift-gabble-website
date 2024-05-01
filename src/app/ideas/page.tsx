"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import { useEffect, useState } from "react";
import { IdeaObj } from "@/utilities/customTypes";
import IdeaListRender from "@/components/IdeaListRender";
import PageWrapper from "@/components/PageWrapper";
import { Amaranth } from "next/font/google";
import useScreenDevice from "@/hooks/useScreenDevice";
import { useAPI } from "@/utilities/useAPI";
import { useRouter } from "next/navigation";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export default function IdeasPage() {
  const formResponse = useFormResponse();
  const screenDevice = useScreenDevice();
  const router = useRouter();

  const [ideaList, setIdeaList] = useState<IdeaObj[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const actionText = screenDevice.isDesktop ? "click" : "tap";

  useEffect(() => {
    // TODO: Use local storage for this stuff
    if (formResponse.isFormResponseLoaded && !isLoading && !ideaList.length)
      fetchIdeaList();
  }, [formResponse, isLoading, ideaList]);

  async function fetchIdeaList() {
    setIsLoading(true);
    const res = await useAPI<IdeaObj[]>({
      actionRoute: "REC",
      formResponse: formResponse,
    });

    if (res.isError) {
      window.alert("Something went wrong, please try again later.");
      router.push("/");
      console.error(res.error);
      return;
    }

    console.log(res);
    const newIdeaList = res.data;
    setIdeaList(newIdeaList);
    setIsLoading(false);
  }

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
          {actionText} the idea you like the most for <b>all</b> shopping
          options.
        </h2>
        <p className={styles.disclaimerText}>
          {`Preview images are not perfect, ${actionText} an idea for more accurate results. Scroll to bottom for more ideas.`}
        </p>
        <IdeaListRender
          ideaList={ideaList}
          isLoading={isLoading || !ideaList.length}
        />
      </div>
    </PageWrapper>
  );
}
