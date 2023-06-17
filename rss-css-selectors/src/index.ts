import App from './components/app/app';
import footer from './components/footer/footer';
import header from './components/header/header';
import './global.scss';

header();
const app = new App();
app.initApp();
footer();
