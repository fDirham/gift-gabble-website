"use client";

import { useState } from "react";
import styles from "./SearchForm.module.scss";
import {
  UNKNOWN_VALUE,
  pronounsOptions,
  whoOptions,
  whoPronounsMap,
  whyOptions,
} from "./options";
import { FormResponse } from "@/utilities/customTypes";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });

export type SearchFormProps = {
  onGo: (config: FormResponse) => void;
  initialValues: FormResponse | null;
};

export default function SearchForm(props: SearchFormProps) {
  const fWhoInitVal = props.initialValues
    ? props.initialValues.who
    : UNKNOWN_VALUE;
  const [fWho, _setFWho] = useState<string>(fWhoInitVal);

  const fWhyInitVal = props.initialValues
    ? props.initialValues.why
    : UNKNOWN_VALUE;
  const [fWhy, setFWhy] = useState<string>(fWhyInitVal);

  const fWhyExtraInitVal = props.initialValues
    ? props.initialValues.whyExtra || ""
    : "";
  const [fWhyExtra, setFWhyExtra] = useState<string>(fWhyExtraInitVal);

  const fDescInitVal = props.initialValues ? props.initialValues.desc : "";
  const [fDesc, setFDesc] = useState<string>(fDescInitVal);

  const fPronounsInitVal = props.initialValues
    ? props.initialValues.pronouns
    : UNKNOWN_VALUE;
  const [fPronouns, setFPronouns] = useState<string>(fPronounsInitVal);

  const fBudgetInitVal = props.initialValues ? props.initialValues.budget : 0;
  const [fBudget, setFBudget] = useState<number>(fBudgetInitVal);

  // Custom state handlers
  function setFWho(newVal: string) {
    _setFWho(newVal);
    const newPronouns = whoPronounsMap[newVal];
    setFPronouns(newPronouns);
  }

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
      why: fWhy,
      who: fWho,
      desc: fDesc,
      budget: fBudget,
      pronouns: fPronouns,
      whyExtra: fWhyExtra,
    });
  }

  const renderInputTree = () => {
    const toRender = [];

    // Who
    toRender.push(
      <label htmlFor="whoSelect" key="whoSelectLabel">
        I'm getting a gift for my...
      </label>
    );

    toRender.push(
      <select
        name="whoSelect"
        id="whoSelect"
        key="whoSelect"
        value={fWho}
        onChange={(e) => setFWho(e.target.value)}
      >
        {renderOptions(whoOptions, "who")}
      </select>
    );

    if (fWho == UNKNOWN_VALUE) return toRender;

    // Why
    toRender.push(
      <label htmlFor="whySelect" key="whySelectLabel">
        for...
      </label>
    );

    toRender.push(
      <select
        name="whySelect"
        id="whySelect"
        key="whySelect"
        value={fWhy}
        onChange={(e) => setFWhy(e.target.value)}
      >
        {renderOptions(whyOptions, "why")}
      </select>
    );

    if (fWhy == UNKNOWN_VALUE) return toRender;

    // Special why cases
    if (fWhy == "other") {
      toRender.push(
        <label htmlFor="otherWhyInput" key="otherWhyInputLabel">
          Why are you buying a gift for your{" "}
          <span className={[amaranth.className, styles.whoSpan].join(" ")}>
            {fWho}
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
          value={fWhyExtra}
          onChange={(e) => setFWhyExtra(e.target.value)}
          placeholder="e.g Because I appreciate them..."
          maxLength={300}
        ></textarea>
      );

      if (!fWhyExtra) return toRender;
    }

    // Description
    toRender.push(
      <label htmlFor="descInput" key="descInputLabel">
        Describe your{" "}
        <span className={[amaranth.className, styles.whoSpan].join(" ")}>
          {fWho}
        </span>
      </label>
    );

    toRender.push(
      <textarea
        name="descInput"
        id="descInput"
        key={"descInput"}
        className={styles.descInput}
        value={fDesc}
        onChange={(e) => setFDesc(e.target.value)}
        placeholder="Hobbies? Favorite tv shows / media? Personality?"
        maxLength={300}
      ></textarea>
    );

    if (!fDesc) return toRender;

    // Gender pronounss
    toRender.push(
      <label htmlFor="pronounsSelect" key="pronounsSelectLabel">
        OPTIONAL: What are your{" "}
        <span className={[amaranth.className, styles.whoSpan].join(" ")}>
          {fWho}
        </span>
        {"'s"} pronouns?
      </label>
    );

    toRender.push(
      <select
        name="pronounsSelect"
        id="pronounsSelect"
        key="pronounsSelect"
        value={fPronouns}
        onChange={(e) => setFPronouns(e.target.value)}
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
      <span className={styles.input} key={"budgetInput"}>
        {"$ "}
        <input
          name="budgetInput"
          id="budgetInput"
          className={styles.budgetInput}
          value={fBudget}
          onChange={(e) => setFBudget(parseInt(e.target.value))}
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
