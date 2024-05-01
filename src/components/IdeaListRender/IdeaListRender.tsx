"use client";

import styles from "./IdeaListRender.module.scss";
import { IdeaObj } from "@/utilities/customTypes";
import { useRouter } from "next/navigation";
import { encodeObject } from "@/utilities/helpers";
import RotatingImage from "../RotatingImage";

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
  const { productList } = ideaObj;
  const imageList = productList.map((obj) => obj.imageUrl);
  const router = useRouter();

  function handleClick() {
    router.push("/shop?" + encodeObject({ q: ideaObj.idea }));
  }

  const renderImg = () => {
    if (!imageList || !imageList.length) {
      return (
        <img src="/unknown_gift.png" alt="" className={styles.monoIdeaImg} />
      );
    }
    if (imageList.length == 1) {
      return <img src={imageList[0]} alt="" className={styles.monoIdeaImg} />;
    }
    return <RotatingImage imageList={imageList}></RotatingImage>;
  };
  return (
    <div
      className={styles.ideaBlockContainer}
      key={ideaObj.idea}
      onClick={handleClick}
    >
      <div className={styles.ideaImgContainer}>{renderImg()}</div>

      <span className={styles.ideaText}>{ideaObj.idea}</span>
    </div>
  );
}
