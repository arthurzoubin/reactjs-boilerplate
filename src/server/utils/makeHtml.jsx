import ReactDOMServer from 'react-dom/server';
import Html from 'server/components/Html';

export default function makeHtml(initialState, assets, content) {
  return `<!doctype html>${
    ReactDOMServer.renderToStaticMarkup(
      <Html initialState={initialState} {...assets} content={content} />
    )
  }`;
}
