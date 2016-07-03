/* eslint-disable import/default */
import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createRoutes from './createRoutes';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import 'onsenui';
import {
  Button,
  Page,
  SpeedDial,
  Fab,
  SpeedDialItem,
  Icon,
  Navigator
} from 'react-onsenui';

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const app = document.getElementById('app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({initialState});
const routes = createRoutes(store.getState);
const ons1 = ons;

ReactDOM.render(
  <Navigator>
    <Page>
      <Button>Button</Button>
    </Page>
  </Navigator>,
  app
);
//ReactDOM.render(
  //<Provider store={store}>
    //<IntlProvider>
      //<Router history={browserHistory}>
        //{routes}
      //</Router>
    //</IntlProvider>
  //</Provider>,
  //app
//);
