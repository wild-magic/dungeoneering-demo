import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import Game from '../components/Game';
import { description } from '../package.json';
import '../styles/app.less';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>{description}</title>
          <meta name="theme-color" content="#ffc0cb" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
          <Game />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
