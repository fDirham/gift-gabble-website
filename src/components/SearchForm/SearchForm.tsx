"use client";

import { useState } from "react";
import styles from "./SearchForm.module.scss";
import { UNKNOWN_VALUE, whoOptions, whyOptions } from "./options";

export default function SearchForm() {
  const [fWho, setFWho] = useState<string>(UNKNOWN_VALUE);
  const [fWhy, setFWhy] = useState<string>(UNKNOWN_VALUE);
  const [fDesc, setFDesc] = useState<string>("");
  const [fBudget, setFBudget] = useState<number>(0);

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

  function handleGo() {}

  const renderInputTree = () => {
    const toRender = [];
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

    if (fWho !== UNKNOWN_VALUE) {
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

      if (fWhy !== UNKNOWN_VALUE) {
        toRender.push(
          <label htmlFor="descInput" key="descInputLabel">
            Describe your {fWho} <br />
            {
              "(mention any hobbies, favorite tv shows / movies, personality, etc.)"
            }
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
            placeholder="Type here"
            maxLength={300}
          ></textarea>
        );

        if (fDesc) {
          toRender.push(
            <label htmlFor="budgetInput" key="budgetInputLabel">
              Do you have a budget? ($0 for no)
            </label>
          );

          toRender.push(
            <span className={styles.input}>
              {"$ "}
              <input
                name="budgetInput"
                id="budgetInput"
                key={"budgetInput"}
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
        }
      }
    }
    return toRender;
  };

  return <div className={styles.container}>{renderInputTree()}</div>;
}
