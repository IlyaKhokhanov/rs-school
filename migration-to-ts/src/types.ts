export type SourcesObject = {
  category: string;
  country: string;
  description: string;
  id: string | number;
  language: string;
  name: string;
  url: string;
};

export type NewsObject = {
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
};

export interface ISourcesResponse {
  sources: SourcesObject[];
  status: string;
}

export interface INewsResponse {
  articles: NewsObject[];
  status: string;
  totalResults: number;
}

export type CallbackType<T> = (data?: T) => void;
