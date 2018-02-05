import React from 'react';
import {renderToString} from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {renderRoutes, matchRoutes} from 'react-router-config';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {trigger} from 'redial';

import routes from './client/routes';
import HtmlDocument from './client/HtmlDocument';

import configureStore from './client/configureStore';

export default async function serverSideRender(url) {
  const store = configureStore();
  const branch = matchRoutes(routes, url);
  const history = createMemoryHistory(url);
  const context = {};

  await Promise.all(branch.map(({match, route: {component}}) => (
    trigger('fetch', component, {
      history,
      location: history.location,
      dispatch: store.dispatch,
      match,
      state: store.getState()
    })
  )));

  const html = '<!DOCTYPE html>' + renderToString((
    <HtmlDocument state={store.getState()}>
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    </HtmlDocument>
  ));

  return {
    status: 200,
    html
  };
}