const laravel = {
  LARAVEL_API_VERSION: process.env.LARAVEL_API_VERSION,
  LARAVEL_API_KEY: process.env.LARAVEL_API_KEY,
  LARAVEL_APP_KEY: process.env.LARAVEL_APP_KEY,
  LARAVEL_API_URL: process.env.LARAVEL_API_URL,
}

const dependencies = {
  defaults: [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-helmet',
    'react-intl',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-saga',
  ],
}

export default {
  laravel,
  dependencies,
}
