"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { ProductObj, SearchConfig } from "@/utilities/customTypes";
import {
  DUMMY_SEARCH_CONFIG,
  DUMMY_PRODUCT_LIST,
  DUMMY_REC_LIST,
} from "@/utilities/dummy";

import LandingContent from "@/components/LandingContent";
import SearchingContent from "@/components/SearchingContent";

export default function Home() {
  const [isSearching, setIsSearching] = useState(true);
  const [recList, setRecList] = useState<string[]>(DUMMY_REC_LIST);
  const [productList, setProductList] =
    useState<ProductObj[]>(DUMMY_PRODUCT_LIST);
  const [recIdx, setRecIdx] = useState<number>(0);

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

  const renderContent = () => {
    if (isSearching) {
      return (
        <SearchingContent
          onBack={handleSearchingBack}
          searchConfig={searchFormCache!}
          recList={recList}
          productList={productList}
          recIdx={recIdx}
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
