import React, { useEffect, useRef, useState } from "react";
import styles from "./RotatingImage.module.scss";
import SafeImage from "../SafeImage";

/**
 * Ideas
 * We render two imgs, one over the other
 * On change, we render an image that has animation to go away in a sec
 * Then after animation, we instantly change top to bottom src and bottom to next
 *
 */
type RotatingImageProps = {
  imageList: string[];
  className?: string;
};
export default function RotatingImage(props: RotatingImageProps) {
  const { imageList } = props;

  const [imgIdx, setImgIdx] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currImg, setCurrImg] = useState(imageList[0]);
  const [nextImg, setNextImg] = useState(imageList[1]);
  const [doneFirst, setDoneFirst] = useState(false);

  const imgIdxInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const animTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasImageList = imageList && imageList.length;

  useEffect(() => {
    if (!imgIdxInterval.current && hasImageList) {
      imgIdxInterval.current = setInterval(() => {
        setImgIdx((curr) => {
          const newIdx = curr + 1;
          if (newIdx >= imageList.length) {
            return 0;
          }
          return newIdx;
        });
      }, 3000);
    }

    return () => {
      if (imgIdxInterval.current) {
        clearInterval(imgIdxInterval.current);
      }

      if (animTimeout.current) {
        clearTimeout(animTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!doneFirst) {
      setDoneFirst(true);
      return;
    }
    let nextIdx = imgIdx + 1;
    if (nextIdx >= imageList.length) {
      nextIdx = 0;
    }

    // Start animating image
    setIsAnimating(true);

    if (animTimeout.current) {
      clearTimeout(animTimeout.current);
    }

    animTimeout.current = setTimeout(() => {
      setCurrImg(imageList[imgIdx]);
      setNextImg(imageList[nextIdx]);
      setIsAnimating(false);
    }, 1500);
  }, [imgIdx]);

  const getCurrImgClassName = () => {
    const toReturn = [styles.currImg];
    if (isAnimating) {
      toReturn.push(styles.animImg);
    }
    return toReturn.join(" ");
  };

  return (
    <div className={styles.container}>
      <SafeImage src={currImg} alt="" className={getCurrImgClassName()} />
      <SafeImage src={nextImg} alt="" className={styles.nextImg} />
    </div>
  );
}
