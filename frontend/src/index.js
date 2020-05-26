import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'

import App from './containers/App';
import Reducers from './reducers';


const store = createStore(
                Reducers,
                composeWithDevTools(applyMiddleware(thunk))
            )

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
)