import { UNKNOWN_VALUE } from "@/components/SearchForm/options";
import { FormResponse } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";
import { useCallback } from "react";

function resolveWho(whoOne: string, whoTwo: string) {
  if (!whoTwo || whoTwo == UNKNOWN_VALUE) return whoOne;
  return whoTwo;
}

export default function useFormResponse() {
  const initialValues: FormResponse = {
    who: UNKNOWN_VALUE,
    whoOne: UNKNOWN_VALUE,
    whoTwo: UNKNOWN_VALUE,
    why: UNKNOWN_VALUE,
    whyExtra: "",
    desc: "",
    giftNotes: "",
    budget: 0,
  };

  const [
    formResponse,
    setFormResponse,
    isFormResponseLoaded,
    clearFormResponse,
  ] = useSessionStorage("formResponse", initialValues);

  const modifyFormResponse = useCallback(
    (newFormResponse: Partial<FormResponse>) => {
      const changeTo: FormResponse = { ...formResponse, ...newFormResponse };
      changeTo.who = resolveWho(changeTo.whoOne, changeTo.whoTwo);
      setFormResponse(changeTo);
    },
    [setFormResponse, formResponse]
  );

  return {
    formResponse,
    setFormResponse,
    modifyFormResponse,
    isFormResponseLoaded,
    clearFormResponse,
  };
}
