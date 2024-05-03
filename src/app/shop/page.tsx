"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import PageWrapper from "@/components/PageWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AmazonProductListRender from "@/components/AmazonProductListRender";
import useProductMap from "@/hooks/useProductMap";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export default function ShopPage() {
  const { formResponse, isFormResponseLoaded } = useFormResponse();
  const searchParams = useSearchParams();
  const idea = searchParams.get("q");
  const router = useRouter();

  const { productMap, isProductMapLoaded } = useProductMap();

  const amazonProductList = idea ? productMap[idea] : [];

  useEffect(() => {
    if (idea && isProductMapLoaded && !amazonProductList.length) {
      window.alert("Something went wrong, please try again later");
      console.error("Empty shop product list");
      router.replace("/");
    }
  }, [isProductMapLoaded, idea, amazonProductList]);

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
        isLoading={false}
      />
    </PageWrapper>
  );
}
