import { UNKNOWN_VALUE } from "@/components/SearchForm/options";
import { FormResponse } from "@/utilities/customTypes";
import useLocalStorage from "./useLocalStorage";

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

  const whoOneInitVal = initialValues.whoOne;
  const [whoOne, setWhoOne] = useLocalStorage<string>("whoOne", whoOneInitVal);

  const whoTwoInitVal = initialValues.whoTwo;
  const [whoTwo, setWhoTwo] = useLocalStorage<string>(
    "whoTwoInitVal",
    whoTwoInitVal
  );

  const whyInitVal = initialValues.why;
  const [why, setWhy] = useLocalStorage<string>("whyInitVal", whyInitVal);

  const whyExtraInitVal = initialValues.whyExtra;
  const [whyExtra, setWhyExtra] = useLocalStorage<string>(
    "whyExtraInitVal",
    whyExtraInitVal
  );

  const descInitVal = initialValues.desc;
  const [desc, setDesc] = useLocalStorage<string>("descInitVal", descInitVal);

  const giftNotesInitVal = initialValues.giftNotes;
  const [giftNotes, setGiftNotes] = useLocalStorage<string>(
    "giftNotesInitVal",
    giftNotesInitVal
  );

  const budgetInitVal = initialValues.budget;
  const [budget, setBudget, isFormResponseLoaded] = useLocalStorage<number>(
    "budgetInitVal",
    budgetInitVal
  );

  const who = resolveWho(whoOne, whoTwo);

  function setFormResponse(newFormResponse: FormResponse) {
    setWhoOne(newFormResponse.whoOne);
    setWhoTwo(newFormResponse.whoTwo);
    setWhy(newFormResponse.why);
    setWhyExtra(newFormResponse.whyExtra);
    setDesc(newFormResponse.desc);
    setGiftNotes(newFormResponse.giftNotes);
    setBudget(newFormResponse.budget);
  }

  return {
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
    setFormResponse,
    isFormResponseLoaded,
  };
}
