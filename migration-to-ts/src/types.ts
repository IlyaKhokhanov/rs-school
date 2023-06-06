export interface ISourcesObject {
  category: string;
  country: string;
  description: string;
  id: string | number;
  language: string;
  name: string;
  url: string;
}

export interface INewsObject {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string | number;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ISourcesResponse {
  sources: ISourcesObject[];
  status: string;
}

export interface INewsResponse {
  articles: INewsObject[];
  status: string;
  totalResults: number;
}
