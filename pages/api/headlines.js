import Cors from "cors";

import NewsAPI from "newsapi";
const newsapi = new NewsAPI("API Here");
// api key updated
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  const httpRequest = req.method;

  // Run cors
  await cors(req, res);

  switch (httpRequest) {
    case "GET":
      {
        console.log("inside get handler");
        newsapi.v2
          .topHeadlines({
            // category: "sports",
            language: "en",
            country: "in",
            pageSize: 40,
          })
          .then((response) => {
            // console.log(response);
            if (response.status === "ok") {
              console.log("data received OK");
              // setData(response.data());
              // console.log(response.articles);
              res.status(200).json(response);
            }
          })
          .catch((e) => console.log(e));
      }
      break;
    case "POST":
      {
        console.log("inside post handler");
        const body = JSON.parse(req.body);
        console.log("body:", body);
        const query = body.query;
        console.log("query: ", query);
        newsapi.v2
          .everything({
            language: "en",
            q: query,
            pageSize: 20,
            sortBy: "publishedAt",
          })
          .then((response) => {
            if (response.status === "ok") {
              console.log("got results!");
              console.log("total results: ", response.totalResults);
              res.status(200).json(response);
            } else {
              res
                .status(201)
                .json({ message: "Could not find any related results!" });
            }
          });
      }
      break;
    default:
      res.status(405).end(`Method ${httpRequest} not allowed!`);
      break;
  }
}
