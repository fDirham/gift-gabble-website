"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import PageWrapper from "@/components/PageWrapper";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

import { useRouter, useSearchParams } from "next/navigation";
import {
  AmazonProductObj,
  FullAmazonProductObj,
  ShallowAmazonProductObj,
} from "@/utilities/customTypes";
import { useEffect, useState } from "react";
import AmazonProductListRender from "@/components/AmazonProductListRender";
import { useAPI } from "@/utilities/useAPI";
import useProductMap from "@/hooks/useProductMap";
import useIdeaList from "@/hooks/useIdeaList";

const reconcileAmazonProductObj = (
  fullAmazonProductList: FullAmazonProductObj[],
  shallowAmazonProductList: ShallowAmazonProductObj[]
): AmazonProductObj[] => {
  if (!fullAmazonProductList.length)
    return shallowAmazonProductList.map((obj) => ({
      isShallow: true,
      data: obj,
    }));

  // Map asins to objects from full
  const asinFullMap: { [k: string]: FullAmazonProductObj } = {};
  fullAmazonProductList.forEach((obj) => {
    asinFullMap[obj.asin] = obj;
  });

  const toReturn: AmazonProductObj[] = [];

  for (
    let shallowIdx = 0;
    shallowIdx < shallowAmazonProductList.length;
    shallowIdx++
  ) {
    const shallowObj = shallowAmazonProductList[shallowIdx];

    // Get ASIN
    let asin = shallowObj.amazonUrl;
    const dpStr = "/dp/";
    const dpIdx = asin.indexOf(dpStr);
    asin = asin.slice(dpIdx + dpStr.length);
    const andIdx = asin.indexOf("&");
    if (andIdx > 0) asin = asin.slice(0, andIdx);

    // Push
    if (asinFullMap[asin]) {
      toReturn.push({
        isShallow: false,
        data: asinFullMap[asin],
      });
      delete asinFullMap[asin];
    } else {
      toReturn.push({
        isShallow: true,
        data: shallowObj,
      });
    }
  }

  fullAmazonProductList.forEach((obj) => {
    if (asinFullMap[obj.asin]) {
      toReturn.push({
        isShallow: false,
        data: obj,
      });
    }
  });

  return toReturn;
};

export default function ShopPage() {
  const { formResponse, isFormResponseLoaded } = useFormResponse();
  const searchParams = useSearchParams();
  const idea = searchParams.get("q");
  const router = useRouter();

  const { getProductListForIdea } = useIdeaList();
  const { productMap, addToProductMap, isProductMapLoaded } = useProductMap();

  const fullAmazonProductList: FullAmazonProductObj[] = idea
    ? productMap[idea] || []
    : [];

  const shallowAmazonProductList: ShallowAmazonProductObj[] = idea
    ? getProductListForIdea(idea) || []
    : [];

  const amazonProductList = reconcileAmazonProductObj(
    fullAmazonProductList,
    shallowAmazonProductList
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      isProductMapLoaded &&
      !fullAmazonProductList.length &&
      idea
    )
      fetchProductList();
  }, [isLoading, isProductMapLoaded, fullAmazonProductList, idea]);

  async function fetchProductList() {
    if (!idea) return;

    setIsLoading(true);
    const res = await useAPI<FullAmazonProductObj[]>({
      actionRoute: "AMZN_SEARCH",
      q: idea,
    });

    if (res.isError) {
      window.alert("Something went wrong, please try again later.");
      router.push("/ideas");
      console.error(res.error);
      return;
    }

    const newProductList = res.data;
    addToProductMap(idea, newProductList);
    setIsLoading(false);
  }

  const contentLoading = isLoading || !fullAmazonProductList.length;
  if (!isFormResponseLoaded || !isProductMapLoaded) return null;
  return (
    <PageWrapper isBlankBG>
      <h1 className={styles.title}>
        You can buy <span className={styles.ideaText}>"{idea}"</span> for your{" "}
        <span className={[amaranth.className, styles.whoText].join(" ")}>
          {formResponse.who}
        </span>
        {" from "}
        <span className={styles.amazonText}>Amazon</span>
      </h1>
      <p className={styles.disclaimerText}>
        DISCLAIMER: As an Amazon Associate I earn from qualifying purchases.
        Clicking on any product below takes you to an Amazon page.
      </p>
      <AmazonProductListRender
        amazonProductList={amazonProductList}
        isLoading={contentLoading}
      />
    </PageWrapper>
  );
}
