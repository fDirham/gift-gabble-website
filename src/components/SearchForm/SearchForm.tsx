"use client";

import styles from "./SearchForm.module.scss";
import { UNKNOWN_VALUE, whoOptions, whoTwoMap, whyOptions } from "./options";
import useFormResponse from "@/hooks/useFormResponse";
import { Amaranth } from "next/font/google";
const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export type SearchFormProps = {
  onGo: () => void;
};

export default function SearchForm(props: SearchFormProps) {
  const {
    who,
    whoOne,
    whoTwo,
    why,
    whyExtra,
    desc,
    giftNotes,
    budget,
    setWhoOne,
    setWhoTwo,
    setWhy,
    setWhyExtra,
    setDesc,
    setGiftNotes,
    setBudget,
    isFormResponseLoaded,
  } = useFormResponse();

  function handleGo() {
    props.onGo();
  }

  // Render
  const renderOptions = (
    optionsList: (string | string[])[],
    keyName: string
  ) => {
    return optionsList.map((option, i) => {
      let value = option;
      let display = option;
      if (Array.isArray(option)) {
        value = option[0];
        display = option[1];
      }

      return (
        <option value={value} key={`${i}-${keyName}`}>
          {display}
        </option>
      );
    });
  };

  const renderInputTree = () => {
    if (!isFormResponseLoaded) return null;
    const toRender = [];

    // Who
    toRender.push(
      <label htmlFor="whoOne" key="whoOneLabel">
        I'm getting a gift for my...
      </label>
    );

    toRender.push(
      <select
        name="whoOne"
        id="whoOne"
        key="whoOne"
        value={whoOne}
        onChange={(e) => {
          setWhoOne(e.target.value);
          setWhoTwo(UNKNOWN_VALUE);
        }}
      >
        {renderOptions(whoOptions, "whoOne")}
      </select>
    );

    if (whoOne == UNKNOWN_VALUE) return toRender;
    const whoTwoObj = whoTwoMap[whoOne];

    if (whoTwoObj) {
      toRender.push(
        <label htmlFor="whoTwo" key="whoTwoLabel">
          {whoTwoObj.formLabelText}
        </label>
      );

      toRender.push(
        <select
          name="whoTwo"
          id="whoTwo"
          key="whoTwo"
          value={whoTwo}
          onChange={(e) => setWhoTwo(e.target.value)}
        >
          {renderOptions(whoTwoObj.optionsList, "whoTwo")}
        </select>
      );

      if (whoTwo == UNKNOWN_VALUE) return toRender;
    }

    // Why
    toRender.push(
      <label htmlFor="whySelect" key="whySelectLabel">
        Why?
      </label>
    );

    toRender.push(
      <select
        name="whySelect"
        id="whySelect"
        key="whySelect"
        value={why}
        onChange={(e) => setWhy(e.target.value)}
      >
        {renderOptions(whyOptions, "why")}
      </select>
    );

    if (why == UNKNOWN_VALUE) return toRender;

    // Special why cases
    if (why == "other") {
      toRender.push(
        <label htmlFor="otherWhyInput" key="otherWhyInputLabel">
          Why are you buying a gift for your{" "}
          <span className={[amaranth.className, styles.whoSpan].join(" ")}>
            {who}
          </span>
          {"?"}
        </label>
      );

      toRender.push(
        <textarea
          name="otherWhyInput"
          id="otherWhyInput"
          key={"otherWhyInput"}
          className={styles.otherWhyInput}
          value={whyExtra}
          onChange={(e) => setWhyExtra(e.target.value)}
          placeholder="e.g Because I appreciate them..."
          maxLength={100}
        ></textarea>
      );

      if (!whyExtra) return toRender;
    }

    // Description
    toRender.push(
      <label htmlFor="descInput" key="descInputLabel">
        Describe your{" "}
        <span className={[amaranth.className, styles.whoSpan].join(" ")}>
          {who}
        </span>{" "}
        <br />{" "}
        <span style={{ fontWeight: 400 }}>
          (The more you describe, the better our recommendations will be)
        </span>
      </label>
    );

    toRender.push(
      <textarea
        name="descInput"
        id="descInput"
        key={"descInput"}
        className={styles.descInput}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Hobbies? Favorite tv shows / media? Personality?"
        maxLength={200}
      ></textarea>
    );

    if (!desc) return toRender;

    // gift notes
    toRender.push(
      <label htmlFor="giftNotesInput" key="giftNotesInputLabel">
        OPTIONAL: Any notes about the gift?
      </label>
    );

    toRender.push(
      <textarea
        name="giftNotesInput"
        id="giftNotesInput"
        key={"giftNotesInput"}
        className={styles.giftNotesInput}
        value={giftNotes}
        onChange={(e) => setGiftNotes(e.target.value)}
        placeholder="e.g It needs to be lightweight"
        maxLength={200}
      ></textarea>
    );

    // Budget
    toRender.push(
      <label htmlFor="budgetInput" key="budgetInputLabel">
        OPTIONAL: Do you have a budget? <br />
        ($0 for no)
      </label>
    );

    toRender.push(
      <span
        className={[styles.input, styles.budgetSpan].join(" ")}
        key={"budgetInput"}
      >
        {"$ "}
        <input
          name="budgetInput"
          id="budgetInput"
          className={styles.budgetInput}
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          type="number"
          min={0}
          max={500}
          placeholder="0"
        ></input>
      </span>
    );

    toRender.push(
      <button onClick={handleGo} key={"goButton"}>
        Find a gift!
      </button>
    );

    return toRender;
  };

  return <div className={styles.container}>{renderInputTree()}</div>;
}
