import { encodeObject } from "@/utilities/helpers";
import OpenAI from "openai";
import { DUMMY_PRODUCT_LIST, DUMMY_REC_LIST } from "../../utilities/dummy";
import { ProductObj } from "@/utilities/customTypes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const who = searchParams.get("who");
  const why = searchParams.get("why");
  const desc = searchParams.get("desc");
  const budget = searchParams.get("budget");
  const getRec = searchParams.get("getRec");
  const doSearch = searchParams.get("doSearch");
  const searchKeyWords = searchParams.get("searchKeyWords");
  const debugRec = searchParams.get("debugRec");
  const debugSearch = searchParams.get("debugSearch");

  let recList: string[] = [];
  if (debugRec == "1") {
    recList = DUMMY_REC_LIST;
  } else if (getRec == "1") {
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
      return Response.json({ error: e }, { status: 500 });
    }

    try {
      recList = JSON.parse(openaiRes as string);
    } catch (e) {
      console.error("Parsing recommendations failed", e);
      return Response.json(
        { error: "Unable to parse recommendations." },
        { status: 500 }
      );
    }

    if (!recList.length) {
      return Response.json({ error: "No recommendations." }, { status: 404 });
    }
  }

  let productList: ProductObj[] = [];
  if (debugSearch == "1") {
    productList = DUMMY_PRODUCT_LIST;
  } else if (doSearch == "1") {
    let query = searchKeyWords;
    if (!searchKeyWords) {
      if (recList.length) {
        query = recList[0];
      }
    }

    console.log("query", query);

    if (query) {
      const params = {
        api_key: process.env.RAINFOREST_API_KEY!,
        type: "search",
        amazon_domain: "amazon.com",
        search_term: query as string,
        associate_id: "fbdlabs-20",
        language: "en_US",
        currency: "usd",
        sort_by: "featured",
        page: "1",
        output: "json",
      };

      try {
        const res = await fetch(
          `https://api.rainforestapi.com/request?` + encodeObject(params),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resObj = await res.json();
        const resList = resObj.search_results;
        for (let j = 0; j < resList.length; j++) {
          const curr = resList[j];
          const toAdd: ProductObj = {
            title: curr.title,
            asin: curr.asin,
            linkUrl: curr.link,
            imageUrl: curr.image,
            rating: curr.rating,
            ratingsTotal: curr.ratings_total,
            price: curr.price.raw,
            isPrime: curr.is_prime || false,
          };
          productList.push(toAdd);
        }
      } catch (e) {
        console.error("Retrieve product list failed", e);
        return Response.json(
          { error: "Failed to retrieve product list" },
          { status: 500 }
        );
      }
    }
  }

  return Response.json({ recList, productList });
}
