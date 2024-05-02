"use client";

import styles from "./IdeaListRender.module.scss";
import { IdeaObj } from "@/utilities/customTypes";
import { useRouter } from "next/navigation";
import { encodeObject } from "@/utilities/helpers";
import RotatingImage from "../RotatingImage";
import { DUMMY_IDEA_LIST } from "@/dummy/dummyIdeaList";

type IdeaListRenderProps = {
  ideaList: IdeaObj[];
  isLoading: boolean;
};

export default function IdeaListRender(props: IdeaListRenderProps) {
  const renderIdeaList = () => {
    const toReturn = props.ideaList.map((ideaObj) => {
      return <IdeaBlock ideaObj={ideaObj} key={ideaObj.idea}></IdeaBlock>;
    });

    if (props.isLoading) {
      const pseudoList = new Array(10).fill(null);
      pseudoList.forEach((_, idx) => {
        const toAdd = (
          <IdeaBlock
            ideaObj={DUMMY_IDEA_LIST[0]}
            key={"loading-idea-" + idx}
            isLoading
          ></IdeaBlock>
        );

        toReturn.push(toAdd);
      });
    }

    return toReturn;
  };

  return <div className={styles.container}>{renderIdeaList()}</div>;
}

type IdeaBlockProps = {
  ideaObj: IdeaObj;
  isLoading?: boolean;
};

function IdeaBlock(props: IdeaBlockProps) {
  const { ideaObj } = props;
  const { productList } = ideaObj;
  const imageList = productList.map((obj) => obj.imageUrl);
  const router = useRouter();

  function handleClick() {
    if (props.isLoading) return;

    router.push("/shop?" + encodeObject({ q: ideaObj.idea }));
  }

  const renderImg = () => {
    if (props.isLoading) {
      return null;
    }
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

  const cnIdeaBlockContainer = () => {
    const toReturn = [styles.ideaBlockContainer];
    if (props.isLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  const cnIdeaImgContainer = () => {
    const toReturn = [styles.ideaImgContainer];
    if (props.isLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  const cnIdeaText = () => {
    const toReturn = [styles.ideaText];
    if (props.isLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  return (
    <div
      className={cnIdeaBlockContainer()}
      key={ideaObj.idea}
      onClick={handleClick}
    >
      <div className={cnIdeaImgContainer()}>{renderImg()}</div>
      <span className={cnIdeaText()}>{ideaObj.idea}</span>
    </div>
  );
}
