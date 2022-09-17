import App from './components/App/app';
import './resources/css/reset.scss';
import './resources/css/styles.scss';
import './components/MainPage/mainPage.scss';
import './components/PageFooter/pageFooter.scss';

const app: App = new App();
app.render();
app.listen();
