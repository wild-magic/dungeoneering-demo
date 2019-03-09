import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import Game from '../components/Game';

import '../styles/app.less';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
          <Game />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
