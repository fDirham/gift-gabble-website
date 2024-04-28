"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import {
  IdeaObj,
  FormResponse,
  APIReturnREC,
  ProductObj,
} from "@/utilities/customTypes";
import LandingContent from "@/components/content/LandingContent";
import { useAPI } from "@/utilities/useAPI";
import { initialStates } from "./initStates";
import Link from "next/link";
import { Allura } from "next/font/google";

const allura = Allura({ subsets: ["latin"], weight: "400" });

export enum AppStage {
  LANDING,
  IDEA,
  PRODUCT,
}
export default function Home() {
  // Stage state
  const [appStage, setAppStage] = useState<AppStage>(initialStates.appStage);

  // Data states
  const [oldIdeaList, setOldIdeaList] = useState<IdeaObj[]>([]);
  const [currIdeaList, setCurrIdeaList] = useState<IdeaObj[]>([]);
  function addNewIdeaList(newIdeaList: IdeaObj[]) {
    const nOldIdeaList = [...oldIdeaList, ...currIdeaList];
    setOldIdeaList(nOldIdeaList);
    setCurrIdeaList(newIdeaList);
  }
  const [productDict, setProductDict] = useState<{
    [idea: string]: ProductObj[];
  }>({});

  // Loading states
  const [loadingIdeaList, setLoadingIdeaList] = useState(
    initialStates.loadingIdeaList
  );

  // Cache states
  const [searchFormCache, setSearchFormCache] = useState<FormResponse | null>(
    initialStates.searchFormCache
  );

  async function handleSearch(formResponse: FormResponse) {
    setSearchFormCache(formResponse);
    setLoadingIdeaList(true);

    // Get ideas
    const ideaListRes = await useAPI<APIReturnREC>({
      actionRoute: "REC",
      formResponse,
    });

    if (ideaListRes.isError) {
      setLoadingIdeaList(false);
      console.error(ideaListRes.error);
      window.alert("Something went wrong, please try again later...");
      return;
    }

    addNewIdeaList(ideaListRes.data);
  }

  const renderContent = () => {
    return (
      <LandingContent
        handleSearch={handleSearch}
        searchFormCache={searchFormCache}
      />
    );
  };

  const getContainerClass = () => {
    if (appStage !== AppStage.LANDING) {
      return [styles.container, styles["container-searching"]].join(" ");
    } else {
      return styles.container;
    }
  };

  return (
    <div className={getContainerClass()}>
      <header className={styles.header}>
        <span className={[allura.className, styles.appName].join(" ")}>
          gift gabble
        </span>
        <Link className={styles.navLink} href={"/about"}>
          about
        </Link>
      </header>
      <main className={styles.main}>{renderContent()}</main>
    </div>
  );
}
