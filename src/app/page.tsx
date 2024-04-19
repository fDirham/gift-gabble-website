"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { ProductObj, FormResponse } from "@/utilities/customTypes";
import { DUMMY_SEARCH_CONFIG } from "@/utilities/dummy";

import LandingContent from "@/components/content/LandingContent";
import SearchingContent from "@/components/content/SearchingContent";
import { fetchRecommend } from "@/utilities/useAPI";

export default function Home() {
  const [isSearching, setIsSearching] = useState(true);

  // Rec and product states
  const [recIdx, setRecIdx] = useState<number>(0);
  const [recList, setRecList] = useState<string[]>([]);
  const [recProductMap, _setRecProductMap] = useState<{
    [key: string]: ProductObj[];
  }>({});
  function addToRecProductMap(rec: string, productList: ProductObj[]) {
    const newPM = { ...recProductMap, [rec]: productList };
    _setRecProductMap(newPM);
  }
  const currRec = recList[recIdx];
  const currProductList = recProductMap[currRec] || [];

  // Loading states
  const [loadingRecList, setLoadingRecList] = useState(true);
  const [loadingProductList, setLoadingProductList] = useState(true);

  // Cache states
  const [searchFormCache, setSearchFormCache] = useState<FormResponse | null>(
    DUMMY_SEARCH_CONFIG
  );

  async function handleSearch(formResponse: FormResponse) {
    setSearchFormCache(formResponse);
    setIsSearching(true);
    setLoadingRecList(true);
    setLoadingProductList(true);

    const res = await fetchRecommend({
      formResponse,
      doProductList: true,
      doRecList: true,
    });

    if (res.isError) {
      // TODO
      console.error(res.error);
    } else {
      setRecList(res.recList);
      addToRecProductMap(res.productListQuery, res.productList);
    }

    setLoadingRecList(false);
    setLoadingProductList(false);

    console.log(res);
  }

  function handleSearchingBack() {
    setIsSearching(false);
  }

  async function handleRecChange(newRec: string) {
    const newIdx = recList.indexOf(newRec);

    // See if product list exists
    if (!recProductMap[newRec]) {
      setLoadingRecList(true);
      setLoadingProductList(true);

      const res = await fetchRecommend({
        doProductList: true,
        searchKeyWords: newRec,
        doRecList: false,
      });

      if (res.isError) {
        // TODO
        console.error(res.error);
      } else {
        addToRecProductMap(res.productListQuery, res.productList);
      }
      setTimeout(() => {
        setRecIdx(newIdx);
        setLoadingRecList(false);
        setLoadingProductList(false);
      }, 1);
      return;
    }

    setRecIdx(newIdx);
  }

  const renderContent = () => {
    if (isSearching) {
      return (
        <SearchingContent
          onBack={handleSearchingBack}
          formResponse={searchFormCache!}
          currRec={currRec}
          onRecChange={handleRecChange}
          recList={recList}
          productList={currProductList}
          loadingRecList={loadingRecList}
          loadingProductList={loadingProductList}
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
