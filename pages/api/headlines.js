import Cors from "cors";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("NEWSAPI.ORG API HERE");

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
  // Run cors
  await cors(req, res);
  newsapi.v2
    .topHeadlines({
      category: "sports",
      language: "en",
      country: "in",
      pageSize: 40,
    })
    .then((response) => {
      console.log(response);
      if (response.status === "ok") {
        // setData(response.data());
        // console.log(response.articles);

        res.status(200).json(response);
      }
    })
    .catch((e) => console.log(e));
}
