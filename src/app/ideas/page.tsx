"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import { useEffect, useState } from "react";
import IdeaListRender from "@/components/IdeaListRender";
import PageWrapper from "@/components/PageWrapper";
import { Amaranth } from "next/font/google";
import useScreenDevice from "@/hooks/useScreenDevice";
import { useAnalyticsAPI, useRecAPI } from "@/utilities/useAPI";
import { useRouter } from "next/navigation";
import useIdeaList from "@/hooks/useIdeaList";
import useProductMap from "@/hooks/useProductMap";
import { AmazonProductObj } from "@/utilities/customTypes";
import useScrollUp from "@/hooks/useScrollUp";
import useAnalyticsSessionId from "@/hooks/useAnalyticsSessionId";
import Link from "next/link";

const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
const SHOW_INCREMENT = 5;

export default function IdeasPage() {
  const { formResponse, isFormResponseLoaded, isFormResponseEmpty } =
    useFormResponse();
  const screenDevice = useScreenDevice();
  const router = useRouter();
  const { ideaList, setIdeaList, isIdeaListLoaded, shownIdx, setShownIdx } =
    useIdeaList();
  const { productMap, setProductMap } = useProductMap();
  const { analyticsSessionId, isAnalyticsSessionIdLoaded } =
    useAnalyticsSessionId();
  useScrollUp();

  const [isLoading, setIsLoading] = useState(false);

  const actionText = screenDevice.isDesktop ? "click" : "tap";

  useEffect(() => {
    if (isFormResponseLoaded && isFormResponseEmpty) {
      router.replace("/");
    }
  }, [isFormResponseEmpty, isFormResponseLoaded]);

  useEffect(() => {
    if (
      isIdeaListLoaded &&
      !ideaList.length &&
      isFormResponseLoaded &&
      !isFormResponseEmpty &&
      !isLoading &&
      isAnalyticsSessionIdLoaded
    )
      fetchIdeaList();
  }, [
    isIdeaListLoaded,
    ideaList,
    isFormResponseLoaded,
    isFormResponseEmpty,
    isLoading,
    formResponse,
    isAnalyticsSessionIdLoaded,
  ]);

  async function fetchIdeaList(useOldIdeas = false) {
    if (isLoading) return;

    setIsLoading(true);

    const newShownIdeaListLength = shownIdx + SHOW_INCREMENT;
    let workingIdeaList = ideaList;
    if (ideaList.length < newShownIdeaListLength) {
      // Get idea list
      const reqBody: { [k: string]: any } = {
        actionRoute: "REC",
        formResponse: formResponse,
      };

      if (useOldIdeas) {
        reqBody.oldIdeaList = ideaList;
      }

      const res = await useRecAPI<string[]>(reqBody);

      if (res.isError) {
        window.alert("Something went wrong, please try again later.");
        console.error(res.error);
        router.back();
        return;
      }

      const newIdeaList = res.data;

      useAnalyticsAPI({
        actionType: "ig",
        ideaList: newIdeaList,
        sessionId: analyticsSessionId,
      });

      workingIdeaList = [...workingIdeaList, ...newIdeaList];
      setIdeaList(workingIdeaList);
    }

    setShownIdx((curr) => curr + SHOW_INCREMENT);

    // Get products
    const ideasToFindProductsFor = workingIdeaList.slice(
      shownIdx,
      newShownIdeaListLength
    );

    const prodRes = await useRecAPI<{ [idea: string]: AmazonProductObj[] }>({
      actionRoute: "OXYLABS_AMAZON_PROD_SEARCH",
      inList: ideasToFindProductsFor,
    });

    if (prodRes.isError) {
      window.alert("Something went wrong, please try again later.");
      router.push("/");
      console.error(prodRes.error);
      return;
    }

    const newProductMap = prodRes.data;
    setProductMap((curr) => {
      return {
        ...curr,
        ...newProductMap,
      };
    });

    // Delete those without idea list
    const ideasToRemove = ideasToFindProductsFor.filter((idea) => {
      return !newProductMap[idea];
    });
    const finalIdeaList: string[] = [];
    workingIdeaList.forEach((idea) => {
      if (!ideasToRemove.includes(idea)) finalIdeaList.push(idea);
    });

    setIdeaList(finalIdeaList);

    setIsLoading(false);
  }

  async function fetchMoreIdeaList() {
    return await fetchIdeaList(true);
  }

  const renderMore = () => {
    if (contentLoading) return null;
    if (shownIdx < MAX_SHOWN_IDX)
      return (
        <div className={styles.moreContainer}>
          <span className={styles.moreText}>Need more?</span>
          <button onClick={fetchMoreIdeaList}>GIVE ME NEW IDEAS</button>
        </div>
      );
    return (
      <div className={styles.moreContainer}>
        <span className={styles.moreText}>
          Limit reached. Use a different description for more ideas.
        </span>
        <Link href={"/"}>Go back</Link>
      </div>
    );
  };

  const contentLoading = isLoading || !ideaList.length;
  if (!isFormResponseLoaded || !isIdeaListLoaded) return null;

  const shownIdeaList = ideaList.slice(0, shownIdx);
  const MAX_SHOWN_IDX = 20;
  return (
    <PageWrapper isBlankBG>
      <div className={styles.container}>
        <Link href={"/"}>{"<-"} Go back</Link>
        <h1 className={styles.title}>
          Here are some ideas for your{" "}
          <span className={[amaranth.className, styles.whoText].join(" ")}>
            {formResponse.who}.
          </span>
        </h1>
        <h2 className={styles.subtitle}>
          {actionText} the idea you like the most for <b>all</b> shopping
          options through Amazon.com
        </h2>
        <p className={styles.disclaimerText}>
          {`Preview images are not perfect, ${actionText} an idea for more accurate results. Scroll to bottom for more ideas.`}
        </p>
        <IdeaListRender
          ideaList={shownIdeaList}
          isLoading={contentLoading}
          productMap={productMap}
          sessionId={analyticsSessionId}
        />

        {renderMore()}
      </div>
    </PageWrapper>
  );
}
