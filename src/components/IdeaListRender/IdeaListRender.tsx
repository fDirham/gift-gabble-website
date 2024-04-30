"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IdeaListRender.module.scss";
import { IdeaObj } from "@/utilities/customTypes";
import { useRouter } from "next/navigation";
import { encodeObject } from "@/utilities/helpers";

type IdeaListRenderProps = {
  ideaList: IdeaObj[];
};

export default function IdeaListRender(props: IdeaListRenderProps) {
  const renderIdeaList = () => {
    return props.ideaList.map((ideaObj) => {
      return <IdeaBlock ideaObj={ideaObj} key={ideaObj.idea}></IdeaBlock>;
    });
  };

  return <div className={styles.container}>{renderIdeaList()}</div>;
}

type IdeaBlockProps = {
  ideaObj: IdeaObj;
};

function IdeaBlock(props: IdeaBlockProps) {
  const { ideaObj } = props;
  const router = useRouter();
  const [imgIdx, setImgIdx] = useState<number>(0);
  const imageInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // TODO
  // useEffect(() => {
  //   if (!imageInterval.current && ideaObj.imageList) {
  //     imageInterval.current = setInterval(() => {
  //       setImgIdx((curr) => {
  //         const newIdx = curr + 1;
  //         if (newIdx >= ideaObj.imageList!.length) {
  //           return 0;
  //         }
  //         return newIdx;
  //       });
  //     }, 5000);
  //   }

  //   return () => {
  //     if (imageInterval.current) {
  //       clearInterval(imageInterval.current);
  //     }
  //   };
  // }, []);

  function handleClick() {
    router.push("/shop?" + encodeObject({ q: ideaObj.idea }));
  }
  const imgSrc =
    ideaObj.imageList && ideaObj.imageList.length
      ? ideaObj.imageList[imgIdx]
      : "/unknown_gift.png";

  return (
    <div
      className={styles.ideaBlockContainer}
      key={ideaObj.idea}
      onClick={handleClick}
    >
      <div className={styles.ideaImgContainer}>
        <img src={imgSrc} alt="" className={styles.ideaImg} />
      </div>
      <span className={styles.ideaText}>{ideaObj.idea}</span>
    </div>
  );
}
