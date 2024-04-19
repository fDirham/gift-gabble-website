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
];

export const whoPronounsMap: { [k: string]: string } = {
  [UNKNOWN_VALUE]: UNKNOWN_VALUE,
  friend: UNKNOWN_VALUE,
  boyfriend: "male",
  girlfriend: "female",
  husband: "male",
  wife: "female",
  partner: UNKNOWN_VALUE,
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
