// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { parse } = require('url');
const next = require('next');
const { join } = require('path');
const express = require('express');
const spdy = require('spdy');
const compression = require('compression');
const createLocaleMiddleware = require('express-locale');
const fs = require('fs');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const localeMiddleware = createLocaleMiddleware();

app.prepare().then(() => {
  const appExpress = express();
  appExpress.use(localeMiddleware);
  appExpress.use(compression());

  app.setAssetPrefix('');

  appExpress.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (req.hostname.match(/^www\..*/i)) {
      res.redirect('https://juangaspar.io');
      return;
    }

    if (pathname === '/') {
      app.render(req, res, dev ? '/dev' : '/pro', {}, parsedUrl);
    } else if (
      pathname === '/service-worker.js' ||
      pathname.indexOf('precache-manifest') !== -1
    ) {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else if (pathname === '/amp.html') {
      res.setHeader('content-type', 'text/html');
      fs.createReadStream('./amp.html').pipe(res);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  if (dev) {
    appExpress.listen(8080, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:8080');
    });
  } else {
    var options = {
      key: fs.readFileSync('/etc/letsencrypt/live/juangaspar.io/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/juangaspar.io/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/juangaspar.io/chain.pem')
    };

    spdy.createServer(options, appExpress).listen(443);

    http
      .createServer(function(req, res) {
        res.writeHead(301, { Location: 'https://juangaspar.io' });
        res.end();
      })
      .listen(80);
  }
});
