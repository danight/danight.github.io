import React from 'react';
import { render } from 'react-dom';
import App from './components';
import { createStore } from 'redux';
import todoApp from './reducers';
import { Provider } from 'react-redux';
import './index.css';

const store = createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)