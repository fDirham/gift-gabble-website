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
import SearchingContent from "@/components/content/SearchingContent";
import { useAPI } from "@/utilities/useAPI";
import LoadingContent from "@/components/content/LoadingContent";
import { initialStates } from "./initStates";
import Link from "next/link";
import { Allura } from "next/font/google";

const allura = Allura({ subsets: ["latin"], weight: "400" });
export default function Home() {
  const [isSearching, setIsSearching] = useState(initialStates.isSearching);

  // States
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

  function handleSearchingBack() {
    setIsSearching(false);
  }

  const renderContent = () => {
    if (loadingIdeaList) {
      return <LoadingContent formResponse={searchFormCache!} />;
    }
    if (isSearching) {
      return (
        <SearchingContent
          onBack={handleSearchingBack}
          formResponse={searchFormCache!}
          ideaList={currIdeaList}
        />
      );
    }
    return (
      <LandingContent
        handleSearch={handleSearch}
        searchFormCache={searchFormCache}
      />
    );
  };

  const getContainerClass = () => {
    if (isSearching) {
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
