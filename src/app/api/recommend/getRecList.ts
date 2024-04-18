import OpenAI from "openai";
import { DUMMY_REC_LIST } from "../../../utilities/dummy";

export default async function getRecList(
  searchParams: URLSearchParams,
  isDebug: boolean
): Promise<
  | { isError: false; recList: string[] }
  | { isError: true; errorObj: any; status?: number }
> {
  if (isDebug) return { isError: false, recList: DUMMY_REC_LIST };

  const who = searchParams.get("who");
  const why = searchParams.get("why");
  const desc = searchParams.get("desc");
  const budget = searchParams.get("budget");

  const openai = new OpenAI();

  const systemPrompt = `
  You are an expert and creative gift recommendation machine. When prompted, you output 10 interesting and personal gift recommendations in JSON list format. Keep responses short. Here is an example output format:
###
[
"rec1",
"rec2",
...
]
###
  `;

  let extendedWhy = why;
  switch (extendedWhy) {
    case "bday":
      extendedWhy = ". Their birthday is coming up";
      break;
    case "anniversary":
      extendedWhy = ". Our anniversary is coming up";
      break;
    case "wedding":
      extendedWhy = ". Their wedding is coming up";
      break;
    case "na":
      extendedWhy = "";
      break;
    default:
      extendedWhy = "";
      break;
  }

  const userPrompt = `
  I want to get a gift for my ${who}${extendedWhy}. ${desc}. I only have a budget of $${budget}. What should I get?
  `;

  let openaiRes = "";

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    openaiRes = completion.choices[0].message.content as string;
  } catch (e) {
    console.error("Openai failed", e);
    return { isError: true, status: 500, errorObj: { error: e } };
  }

  let recList: string[] = [];
  try {
    recList = JSON.parse(openaiRes as string);
  } catch (e) {
    console.error("Parsing recommendations failed", e);

    return {
      isError: true,
      status: 500,
      errorObj: { error: "Unable to parse recommendations." },
    };
  }

  if (!recList.length) {
    console.error("No recommendations");
    return {
      isError: true,
      status: 404,
      errorObj: { error: "No recommendations." },
    };
  }

  return { isError: false, recList };
}
