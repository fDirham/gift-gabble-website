"use client";

import styles from "./IdeaListRender.module.scss";
import { useRouter } from "next/navigation";
import { encodeObject } from "@/utilities/helpers";
import RotatingImage from "../RotatingImage";
import { AmazonProductObj } from "@/utilities/customTypes";
import { useAnalyticsAPI } from "@/utilities/useAPI";

type IdeaListRenderProps = {
  ideaList: string[];
  isLoading: boolean;
  productMap: { [idea: string]: AmazonProductObj[] };
  sessionId: string;
};

export default function IdeaListRender(props: IdeaListRenderProps) {
  const renderIdeaList = () => {
    const toReturn = props.ideaList.map((idea, idx) => {
      const productList = props.productMap[idea] ? props.productMap[idea] : [];
      return (
        <IdeaBlock
          idea={idea}
          key={idea}
          productList={productList}
          isLoading={props.isLoading}
          pureLoading={false}
          orderIdx={idx}
          sessionId={props.sessionId}
        ></IdeaBlock>
      );
    });

    if (props.isLoading) {
      for (let i = 0; i < 10; i++) {
        const toAdd = (
          <IdeaBlock key={"loading-idea-" + i} pureLoading></IdeaBlock>
        );

        toReturn.push(toAdd);
      }
    }

    return toReturn;
  };

  return <div className={styles.container}>{renderIdeaList()}</div>;
}

type IdeaBlockProps =
  | {
      pureLoading: false;
      idea: string;
      productList: AmazonProductObj[];
      isLoading?: boolean;
      orderIdx: number;
      sessionId: string;
    }
  | {
      pureLoading: true;
    };

function IdeaBlock(props: IdeaBlockProps) {
  const productList = props.pureLoading ? [] : props.productList;
  const imageList = productList.map((obj) => obj.imageUrl);
  const router = useRouter();

  function handleClick() {
    if (props.pureLoading || props.isLoading) return;

    useAnalyticsAPI({
      actionType: "ic",
      idea: props.idea,
      ideaIdx: props.orderIdx,
      sessionId: props.sessionId,
    });
    router.push("/shop?" + encodeObject({ q: props.idea }));
  }

  const renderImg = () => {
    if (props.pureLoading || (props.isLoading && !imageList.length)) {
      return null;
    }
    if (!imageList.length) {
      return (
        <img src="/unknown_gift.png" alt="" className={styles.monoIdeaImg} />
      );
    }
    if (imageList.length == 1) {
      return <img src={imageList[0]} alt="" className={styles.monoIdeaImg} />;
    }
    return <RotatingImage imageList={imageList}></RotatingImage>;
  };

  const cnIdeaBlockContainer = () => {
    const toReturn = [styles.ideaBlockContainer];
    if (props.pureLoading || props.isLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  const cnIdeaImgContainer = () => {
    const toReturn = [styles.ideaImgContainer];
    if (props.pureLoading) {
      toReturn.push(styles.loading);
    } else if (props.isLoading && !imageList.length) {
      toReturn.push(styles.ideaLoading);
    }
    return toReturn.join(" ");
  };

  const cnIdeaText = () => {
    const toReturn = [styles.ideaText];
    if (props.pureLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  const ideaStr = props.pureLoading ? "________" : props.idea;
  const getPriceStr = () => {
    if (props.pureLoading || !props.productList.length) return;

    let minP = -1;
    let maxP = -1;
    let currencySymbol = "";
    for (let i = 0; i < props.productList.length; i++) {
      const currObj = productList[i];
      const currPrice = currObj.price;
      if (currPrice) {
        if (minP == -1 || currPrice < minP) {
          minP = currPrice;
        }
        if (maxP == -1 || currPrice > maxP) {
          maxP = currPrice;
        }
        if (currObj.currencySymbol) {
          currencySymbol = currObj.currencySymbol;
        }
      }
    }

    if (minP == maxP) return currencySymbol + minP;
    return `${currencySymbol}${minP} - ${currencySymbol}${maxP}`;
  };
  return (
    <div className={cnIdeaBlockContainer()} onClick={handleClick}>
      <div className={cnIdeaImgContainer()}>{renderImg()}</div>
      <span className={cnIdeaText()}>{ideaStr}</span>
      <span className={styles.priceTag}>{getPriceStr()}</span>
    </div>
  );
}
