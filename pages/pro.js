import Head from 'next/head';
import { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Background from '../components/Background';
import Info from '../components/Info';
import initStore from '../store/index';

const store = initStore();

class Index extends Component {
  getInitialProps = async ({ req }) => {
    if (req) {
      const language = req.locale
        ? ['es', 'en'].includes(req.locale.language)
          ? req.locale.language
          : 'en'
        : 'en';
      return { language };
    }
  };

  componentDidMount = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .catch(err => console.error('Service worker registration failed', err));
    } else {
      console.log('Service worker not supported');
    }

    window.sc_project = 11657285;
    window.sc_invisible = 1;
    window.sc_security = 'ae0be4a9';
  };

  render = () => {
    const { language } = this.props;

    return (
      <Provider store={store}>
        <div>
          <Head>
            <title>juangaspar IO</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1.0"
            />
            <link rel="manifest" href="/static/manifest.json" />
            <link rel="amphtml" href="/amp.html" />
            <script
              type="text/javascript"
              src="https://www.statcounter.com/counter/counter.js"
              async
            />
          </Head>
          <Background language={language} />
          <Info language={language} />
          <style global jsx>{`
            @font-face {
              font-family: 'PressStart2P';
              src: url('static/PressStart2P.ttf') format('truetype');
            }
            body {
              margin: 0;
              font-family: 'PressStart2P', sans-serif;
              background-color: rgb(102, 17, 102);
            }

            a {
              color: rgb(80, 80, 80);
              text-decoration: none;
            }
          `}</style>
          <div class="statcounter">
            <a
              title="Web Analytics"
              href="http://statcounter.com/"
              target="_blank"
            >
              <img
                class="statcounter"
                src="//c.statcounter.com/11657285/0/ae0be4a9/1/"
                alt="Web Analytics"
              />
            </a>
          </div>
        </div>
      </Provider>
    );
  };
}

export default Index;
