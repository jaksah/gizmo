import * as React from 'react';
import * as redux from 'redux'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
  reducers,
  Store,
} from './reducers/index'
import {HelloWorld} from './components/HelloWorld';

let store: redux.Store<Store.All> = redux.createStore(
  reducers,
  {} as Store.All
)

ReactDOM.render(<Provider store={store}><HelloWorld /></Provider>, document.getElementById("app"));