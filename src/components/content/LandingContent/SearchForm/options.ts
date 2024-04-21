export const UNKNOWN_VALUE = "???";
export const OTHER_VALUE = "other";
export const whoOptions = [
  UNKNOWN_VALUE,
  "friend",
  "boyfriend",
  "girlfriend",
  "husband",
  "wife",
  "partner",
  "family",
];

const familyWhoOptions: (string | string[])[] = [
  UNKNOWN_VALUE,
  "mom",
  "dad",
  "sister",
  "brother",
  "cousin",
  "uncle",
  "aunt",
  "grandfather",
  "grandmother",
];

export const whoTwoMap: {
  [key: string]: {
    formLabelText: string;
    optionsList: (string | string[])[];
  };
} = {
  family: {
    formLabelText: "Who in your family?",
    optionsList: familyWhoOptions,
  },
};

export const whoPronounsMap: { [k: string]: string } = {
  [UNKNOWN_VALUE]: UNKNOWN_VALUE,
  friend: UNKNOWN_VALUE,
  boyfriend: "male",
  girlfriend: "female",
  husband: "male",
  wife: "female",
  partner: UNKNOWN_VALUE,
  mom: "female",
  dad: "male",
  sister: "female",
  brother: "male",
  cousin: UNKNOWN_VALUE,
  uncle: "male",
  aunt: "female",
  grandfather: "male",
  grandmother: "female",
};

export const whyOptions = [
  UNKNOWN_VALUE,
  ["bday", "their birthday"],
  ["anniversary", "our anniversary"],
  ["wedding", "their wedding"],
  ["other", "other (add below)"],
  // Add bottom later
  // ["sorry", "forgiveness"],
  // ["event", "an event"],
  ["na", "no reason"],
];

export const pronounsOptions = [
  UNKNOWN_VALUE,
  ["male", "he / him"],
  ["female", "she / her"],
  ["they", "they / them"],
  ["they", "other"],
];
