import React from "react";
import styles from "./LoadingContent.module.scss";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { FormResponse } from "@/utilities/customTypes";
import LoadingText from "@/components/shared/LoadingText";
import LoadingGif from "@/components/shared/LoadingGif";
import { resolveWho } from "../LandingContent/SearchForm/SearchForm";

const LOAD_STATUS_LIST = [
  "brainstorming recommendations",
  "decoding your {WHO}'s astrological signs",
  "starting virtual DNA analysis on your {WHO}",
  "activating the gift microscope",
  "extensive background and criminal check on your {WHO}",
  "googling your {WHO}",
  "reading your {WHO}'s tea leaves",
  "studying https://en.wikipedia.org/wiki/{WHO}",
];

const INTERVAL_DELAY = 2500;

type LoadingContentProps = {
  formResponse: FormResponse;
};
export default function LoadingContent(props: LoadingContentProps) {
  const getLoadingTextList = () => {
    const who = resolveWho(
      props.formResponse.whoOne,
      props.formResponse.whoTwo
    );
    return LOAD_STATUS_LIST.map((text) => {
      text = text.replace("{WHO}", who);
      return text;
    });
  };

  return (
    <div className={styles.container}>
      <LoadingText
        intervalDelay={INTERVAL_DELAY}
        textList={getLoadingTextList()}
        className={styles.statusText}
      />
      <LoadingSpinner className={styles.spinner} />
      <LoadingGif
        intervalDelay={INTERVAL_DELAY}
        gifClassName={styles.loadingGif}
      />
    </div>
  );
}
