import App from './components/App/app';
import './resources/css/reset.scss';
import './resources/css/styles.scss';
import './components/Main/mainPage.scss';
import './components/PageFooter/pageFooter.scss';
import './components/DictionaryPage/dictionaryPage.scss';

const app: App = new App();
app.render();
app.listen();
