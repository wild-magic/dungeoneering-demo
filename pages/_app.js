import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import Game from '../components/Game';
import { description } from '../package.json';
import '../styles/app.less';
import sword from '../Game/assets/weapon_golden_sword.png';
import demo from '../Game/assets/dungeon-demo.png';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>{description}</title>
          <meta name="theme-color" content="#ffc0cb" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href={sword} />
          <meta property="og:title" content={description} />
          <meta
            property="og:description"
            content="Crawl through a dungeon and explore the features of a wild-magic enabled game."
          />
          <meta property="og:image" content={demo} />
          <meta property="og:url" content="https://wild-magic.io" />
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
