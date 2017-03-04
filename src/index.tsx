import * as React from 'react';
import * as redux from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as createLogger from 'redux-logger'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
  reducers,
  Store,
} from './reducers/index'
import {App} from './App';

const loggerMiddleware = createLogger()

let store: redux.Store<Store.All> = redux.createStore(
  reducers,
  redux.applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app"));