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
  const history = createMemoryHistory({
    initialEntries: [url]
  });

  const branch = matchRoutes(routes, history.location.pathname);
  await Promise.all(branch.map(({match, route: {component}}) => (
    trigger('fetch', component, {
      history,
      location: history.location,
      dispatch: store.dispatch,
      match,
      state: store.getState()
    })
  )));

  // TODO: Handle redirect

  const context = {};
  const html = '<!DOCTYPE html>' + renderToString((
    <Provider store={store}>
      <HtmlDocument>
        <StaticRouter location={history.location} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </HtmlDocument>
    </Provider>
  ));

  return {
    status: 200,
    html
  };
}