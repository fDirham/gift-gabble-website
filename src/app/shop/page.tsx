"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import PageWrapper from "@/components/PageWrapper";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

import { useSearchParams } from "next/navigation";
import { AmazonProductObj } from "@/utilities/customTypes";
import { useState } from "react";
import { DUMMY_AMAZON_SEARCH_RES } from "@/dummy/dummyAmazonSearchRes";
import AmazonProductListRender from "@/components/AmazonProductListRender";

export default function ShopPage() {
  const formResponse = useFormResponse();
  const searchParams = useSearchParams();
  const idea = searchParams.get("q");

  const [amazonProductList, setAmazonProductList] = useState<
    AmazonProductObj[]
  >(DUMMY_AMAZON_SEARCH_RES);

  return (
    <PageWrapper isBlankBG>
      <h1 className={styles.title}>
        You can buy <span className={styles.ideaText}>"{idea}"</span> for your{" "}
        <span className={[amaranth.className, styles.whoText].join(" ")}>
          {formResponse.who}
        </span>
        {" right now from "}
        <span className={styles.amazonText}>Amazon</span>
      </h1>
      <p className={styles.disclaimerText}>
        DISCLAIMER: As an Amazon Associate I earn from qualifying purchases.
        Clicking on any product below takes you to an Amazon page.
      </p>
      <AmazonProductListRender amazonProductList={amazonProductList} />
    </PageWrapper>
  );
}
