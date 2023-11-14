require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');

const keys = require('./config/keys');
const webpackConfig = require('../webpack.config');
const router = require('./router');

const { port } = keys;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', router);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    middleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(compression());
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`);
});
