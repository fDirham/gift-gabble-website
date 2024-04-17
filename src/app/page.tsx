"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { ProductObj, SearchConfig } from "@/utilities/customTypes";
import {
  DUMMY_SEARCH_CONFIG,
  DUMMY_REC_LIST,
  DUMM_REC_PRODUCT_MAP,
} from "@/utilities/dummy";

import LandingContent from "@/components/LandingContent";
import SearchingContent from "@/components/SearchingContent";

export default function Home() {
  const [isSearching, setIsSearching] = useState(true);
  const [recIdx, setRecIdx] = useState<number>(0);
  const [recList, setRecList] = useState<string[]>(DUMMY_REC_LIST);
  const [recProductMap, setRecProductMap] = useState<{
    [key: string]: ProductObj[];
  }>(DUMM_REC_PRODUCT_MAP);

  const currRec = recList[recIdx];
  const currProductList = recProductMap[currRec] || [];

  const [searchFormCache, setSearchFormCache] = useState<SearchConfig | null>(
    DUMMY_SEARCH_CONFIG
  );

  function handleSearch(searchConfig: SearchConfig) {
    setSearchFormCache(searchConfig);
    setIsSearching(true);
  }

  function handleSearchingBack() {
    setIsSearching(false);
  }

  function handleRecChange(newRec: string) {
    const newIdx = recList.indexOf(newRec);
    setRecIdx(newIdx);
  }

  const renderContent = () => {
    if (isSearching) {
      return (
        <SearchingContent
          onBack={handleSearchingBack}
          searchConfig={searchFormCache!}
          currRec={currRec}
          onRecChange={handleRecChange}
          recList={recList}
          productList={currProductList}
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
      <header></header>
      <main className={styles.main}>{renderContent()}</main>
      <footer></footer>
    </div>
  );
}
