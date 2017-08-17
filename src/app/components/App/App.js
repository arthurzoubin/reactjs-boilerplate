import DocumentMeta from 'react-helmet'
// example s?css module import
import style from './App.module.scss'
// example s?css import (no module)
import './App.css'

const log = debug('App.js')

const metaData = {
  defaultTitle: 'Reactjs Boilerplate',
  titleTemplate: '%s | Reactjs Boilerplate',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
    {
      name: 'description',
      content: 'Reactjs Boilerplate, a minimal boilerplate for building universal react applications',
    },
    {
      name: 'keywords',
      content: 'react,redux,react-router,koa,universal,babel,es7,hmr,webpack',
    },
  ],
}

export default class App extends React.Component {
  render() {
    const { children } = this.props
    log('render')
    return (
      <div className={style.app}>
        <DocumentMeta {...metaData} />
        <h1>Reactjs Boilerplate</h1>
        <main className={style.content}>
          {children}
        </main>
      </div>
    )
  }
}
