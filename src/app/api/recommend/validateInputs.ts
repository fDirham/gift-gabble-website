export default function validateInputs(
  searchParams: URLSearchParams
): null | string {
  const MAX_USER_INPUT_LENGTH = 205;
  const cappedParamsList = [
    "who",
    "why",
    "whyExtra",
    "desc",
    "budget",
    "pronouns",
  ];

  for (let i = 0; i < cappedParamsList.length; i++) {
    const currParam = cappedParamsList[i];
    const val = searchParams.get(currParam);
    if (!val) continue;
    if (val.length > MAX_USER_INPUT_LENGTH) {
      return "Invalid inputs";
    }
  }

  return null;
}
