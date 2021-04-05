export class NewsModel {
  status: string;

  totalResults: number;

  articles: Array<Map<string, any>>;

  constructor(status: string, totalResults: number, articles: Array<Map<string, any>>) {
    this.status = status;
    this.totalResults = totalResults;
    this.articles = articles;
  }
}
