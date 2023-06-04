import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'bc5915683caf415c89e455519f95da46', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
