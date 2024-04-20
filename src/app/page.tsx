"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { ProductObj, FormResponse } from "@/utilities/customTypes";
import LandingContent from "@/components/content/LandingContent";
import SearchingContent from "@/components/content/SearchingContent";
import { fetchRecommend } from "@/utilities/useAPI";
import LoadingContent from "@/components/content/LoadingContent";
import { initialStates } from "./initStates";

export default function Home() {
  const [isSearching, setIsSearching] = useState(initialStates.isSearching);

  // Rec and product states
  const [recIdx, setRecIdx] = useState<number>(initialStates.recIdx);
  const [recList, setRecList] = useState<string[]>(initialStates.recList);
  const [recProductMap, _setRecProductMap] = useState<{
    [key: string]: ProductObj[];
  }>(initialStates.recProductMap);
  function addToRecProductMap(rec: string, productList: ProductObj[]) {
    const newPM = { ...recProductMap, [rec]: productList };
    _setRecProductMap(newPM);
  }
  const currRec = recList[recIdx];
  const currProductList = recProductMap[currRec] || [];

  // Loading states
  const [loadingRecList, setLoadingRecList] = useState(
    initialStates.loadingRecList
  );
  const [loadingProductList, setLoadingProductList] = useState(
    initialStates.loadingProductList
  );

  // Cache states
  const [searchFormCache, setSearchFormCache] = useState<FormResponse | null>(
    initialStates.searchFormCache
  );

  async function handleSearch(formResponse: FormResponse) {
    setSearchFormCache(formResponse);
    setLoadingRecList(true);
    setLoadingProductList(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1);

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

    setIsSearching(true);
  }

  function handleSearchingBack() {
    setIsSearching(false);
  }

  async function handleRecChange(newRec: string) {
    const newIdx = recList.indexOf(newRec);

    // See if product list exists
    setRecIdx(newIdx);
    if (!recProductMap[newRec]) {
      setLoadingProductList(true);

      const res = await fetchRecommend({
        doProductList: true,
        searchKeyWords: newRec,
        doRecList: false,
        formResponse: searchFormCache!,
      });

      if (res.isError) {
        // TODO
        console.error(res.error);
      } else {
        addToRecProductMap(res.productListQuery, res.productList);
      }
      setTimeout(() => {
        setLoadingProductList(false);
      }, 1);
      return;
    }

    setRecIdx(newIdx);
  }

  const renderContent = () => {
    if (loadingRecList) {
      return <LoadingContent formResponse={searchFormCache!} />;
    }
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
