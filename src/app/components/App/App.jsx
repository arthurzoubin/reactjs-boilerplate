import DocumentMeta from 'react-helmet';
// example s?css module import
import style from './App.module.scss';
// example s?css import (no module)
import './App.css';

const log = debug('App.js');

const metaData = {
  defaultTitle: 'Reactjs Base',
  titleTemplate: '%s | Reactjs Base',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
    {
      name: 'description',
      content: 'Reactjs Base, a minimal boilerplate for building universal react applications',
    },
    {
      name: 'keywords',
      content: 'react,redux,react-router,koa,universal,babel,es7,hmr,webpack',
    },
  ],
};

const App = ({ children }) => {
  log('render');
  return (
    <div className={style.app}>
      <DocumentMeta {...metaData} />
      <h1>Reactjs Base</h1>
      <main className={style.content}>
        {children}
      </main>
    </div>
  );
};

export default App;
