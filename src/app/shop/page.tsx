"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import PageWrapper from "@/components/PageWrapper";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

import { useRouter, useSearchParams } from "next/navigation";
import { AmazonProductObj } from "@/utilities/customTypes";
import { useEffect, useState } from "react";
import AmazonProductListRender from "@/components/AmazonProductListRender";
import { useAPI } from "@/utilities/useAPI";

export default function ShopPage() {
  const formResponse = useFormResponse();
  const searchParams = useSearchParams();
  const idea = searchParams.get("q");
  const router = useRouter();

  const [amazonProductList, setAmazonProductList] = useState<
    AmazonProductObj[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Use local storage for this stuff
    if (!isLoading && !amazonProductList.length) fetchProductList();
  }, [isLoading, amazonProductList]);

  async function fetchProductList() {
    setIsLoading(true);
    const res = await useAPI<AmazonProductObj[]>({
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
    setAmazonProductList(newProductList);
    setIsLoading(false);
  }

  const contentLoading = isLoading || !amazonProductList.length;
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
