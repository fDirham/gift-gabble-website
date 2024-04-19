import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingContent.module.scss";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { FormResponse } from "@/utilities/customTypes";
import { randomIntFromInterval } from "@/utilities/helpers";

const LOAD_STATUS_LIST = [
  "brainstorming recommendations",
  "decoding your {WHO}'s astrological signs",
  "conducting virtual DNA analysis on your {WHO}",
  "activating the gift microscope",
  "extensive background and criminal check on your {WHO}",
  "googling your {WHO}",
  "reading tea leaves",
  "studying https://en.wikipedia.org/wiki/{WHO}",
];

const GIF_LIST = [
  "https://giphy.com/embed/l3nWhI38IWDofyDrW",
  "https://giphy.com/embed/TvLuZ00OIADoQ",
  "https://giphy.com/embed/l2JhORT5IFnj6ioko",
  "https://giphy.com/embed/iNQ2cIve8rUqI",
  "https://giphy.com/embed/26Ff6khK7g0TQvSUM",
  "https://giphy.com/embed/H5Ooe4b04mkawWC8KN",
  "https://giphy.com/embed/3o7TKILKwQCtphbl7y",
  "https://giphy.com/embed/l0MYHq0IFikDrVQOc",
];

const INTERVAL_DELAY = 2500;

type LoadingContentProps = {
  formResponse: FormResponse;
};
export default function LoadingContent(props: LoadingContentProps) {
  const [loadStatusIdx, setLoadStatusIdx] = useState(0);
  const [gifIdx, setGifIdx] = useState(0);

  const loadStatusHistory = useRef<number[]>([]);
  const gifHistory = useRef<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!intervalRef.current) {
      console.log("doing stuff");

      intervalRef.current = setInterval(() => {
        setLoadStatusIdx((currIdx) => {
          if (loadStatusHistory.current.length >= LOAD_STATUS_LIST.length)
            return currIdx;

          let randomIdx = -1;

          while (true) {
            randomIdx = randomIntFromInterval(0, LOAD_STATUS_LIST.length);
            if (randomIdx == currIdx) continue;
            if (loadStatusHistory.current.includes(randomIdx)) continue;
            break;
          }

          const newHistory = [...loadStatusHistory.current, randomIdx];
          loadStatusHistory.current = newHistory;

          return randomIdx;
        });

        setGifIdx((currIdx) => {
          if (gifHistory.current.length >= GIF_LIST.length) return currIdx;

          let randomIdx = -1;

          while (true) {
            randomIdx = randomIntFromInterval(0, GIF_LIST.length);
            if (randomIdx == currIdx) continue;
            if (gifHistory.current.includes(randomIdx)) continue;
            break;
          }

          const newHistory = [...gifHistory.current, randomIdx];
          gifHistory.current = newHistory;

          return randomIdx;
        });
      }, INTERVAL_DELAY);
    }

    return () => {
      if (intervalRef.current) {
        console.log("cleaning");
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const renderLoadStatus = () => {
    let text = LOAD_STATUS_LIST[loadStatusIdx];
    text = text.replace("{WHO}", props.formResponse.who);
    return text;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.statusText}>{renderLoadStatus()}</h1>
      <LoadingSpinner className={styles.spinner} />
      <iframe
        src={GIF_LIST[gifIdx]}
        className={styles.gifEmbed}
        allowFullScreen
      ></iframe>
    </div>
  );
}
