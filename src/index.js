import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './modules/app/App';
import registerServiceWorker from './registerServiceWorker';
import { useStrict } from 'mobx';

useStrict(true);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
