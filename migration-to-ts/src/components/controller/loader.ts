class Loader {
  constructor(
    protected baseLink: string,
    protected options: { apiKey: string },
  ) {}

  static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        throw Error(
          `Sorry, but there is ${res.status} error: ${res.statusText}`,
        );
      }
      throw Error(res.statusText);
    }

    return res;
  }

  protected getResp(
    {
      endpoint,
      options = {},
    }: { endpoint: string; options: { sources?: string } },
    callback = () => {
      throw Error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private makeUrl(
    options: { [key: string]: string },
    endpoint: string,
  ): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
    method: string,
    endpoint: string,
    callback: (data: JSON) => void,
    options: { [key: string]: string } = {},
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(Loader.errorHandler)
      .then((res) => res.json())
      .then((data: JSON) => callback(data))
      .catch((err: Error) => new Error(err.message));
  }
}

export default Loader;
