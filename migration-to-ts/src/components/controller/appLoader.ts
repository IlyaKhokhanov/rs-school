import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: 'bc5915683caf415c89e455519f95da46',
    });
  }
}

export default AppLoader;
