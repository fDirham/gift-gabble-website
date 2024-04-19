"use client";

import { useEffect, useState } from "react";
import styles from "./SearchForm.module.scss";
import {
  UNKNOWN_VALUE,
  pronounsOptions,
  whoOptions,
  whoPronounsMap,
  whoTwoMap,
  whyOptions,
} from "./options";
import { FormResponse } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export type SearchFormProps = {
  onGo: (config: FormResponse) => void;
  initialValues: FormResponse | null;
};

export function resolveWho(whoOne: string, whoTwo: string) {
  if (!whoTwo || whoTwo == UNKNOWN_VALUE) return whoOne;
  return whoTwo;
}

export default function SearchForm(props: SearchFormProps) {
  const initialValues: FormResponse = props.initialValues
    ? props.initialValues
    : {
        whoOne: UNKNOWN_VALUE,
        whoTwo: UNKNOWN_VALUE,
        why: UNKNOWN_VALUE,
        whyExtra: "",
        desc: "",
        pronouns: "",
        budget: 0,
      };
  const whoOneInitVal = initialValues.whoOne;
  const [whoOne, setWhoOne] = useState<string>(whoOneInitVal);

  const whoTwoInitVal = initialValues.whoTwo;
  const [whoTwo, setWhoTwo] = useState<string>(whoTwoInitVal);

  const whyInitVal = initialValues.why;
  const [why, setWhy] = useState<string>(whyInitVal);

  const whyExtraInitVal = initialValues.whyExtra;
  const [whyExtra, setWhyExtra] = useState<string>(whyExtraInitVal);

  const descInitVal = initialValues.desc;
  const [desc, setDesc] = useState<string>(descInitVal);

  const pronounsInitVal = initialValues.pronouns;
  const [pronouns, setPronouns] = useState<string>(pronounsInitVal);

  const budgetInitVal = initialValues.budget;
  const [budget, setBudget] = useState<number>(budgetInitVal);

  useEffect(() => {
    const newWho = resolveWho(whoOne, whoTwo);
    setPronouns(whoPronounsMap[newWho] || UNKNOWN_VALUE);
  }, [whoOne, whoTwo]);

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

  function handleGo() {
    props.onGo({
      whoOne: whoOne,
      whoTwo: whoTwo,
      why: why,
      desc: desc,
      budget: budget,
      pronouns: pronouns,
      whyExtra: whyExtra,
    });
  }

  const renderInputTree = () => {
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

    const resolvedWho = resolveWho(whoOne, whoTwo);

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
            {resolvedWho}
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
          maxLength={300}
        ></textarea>
      );

      if (!whyExtra) return toRender;
    }

    // Description
    toRender.push(
      <label htmlFor="descInput" key="descInputLabel">
        Describe your{" "}
        <span className={[amaranth.className, styles.whoSpan].join(" ")}>
          {resolvedWho}
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
        maxLength={300}
      ></textarea>
    );

    if (!desc) return toRender;

    // Gender pronouns
    toRender.push(
      <label htmlFor="pronounsSelect" key="pronounsSelectLabel">
        OPTIONAL: What are your{" "}
        <span className={[amaranth.className, styles.whoSpan].join(" ")}>
          {resolvedWho}
        </span>
        {"'s"} pronouns?
      </label>
    );

    toRender.push(
      <select
        name="pronounsSelect"
        id="pronounsSelect"
        key="pronounsSelect"
        value={pronouns}
        onChange={(e) => setPronouns(e.target.value)}
      >
        {renderOptions(pronounsOptions, "pronouns")}
      </select>
    );

    // Budget
    toRender.push(
      <label htmlFor="budgetInput" key="budgetInputLabel">
        OPTIONAL: Do you have a budget? ($0 for no)
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
