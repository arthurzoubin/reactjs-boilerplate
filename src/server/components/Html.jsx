import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export default class Html extends React.Component {
  getMetaData() {
    const head = Helmet.rewind();
    return {
      meta: head.meta.toComponent(),
      title: head.title.toComponent(),
    };
  }

  render() {
    const {
      initialState,
      content,
      otherLinks,
      stringScripts,
      headStyles,
      headScripts,
      bodyScripts,
      libScripts,
      bodyStyles,
    } = this.props
    const { meta, title } = this.getMetaData();
    return (
      <html lang="en">
        <head>
          {title}
          {meta}
          {otherLinks.map((props, i) =>
            <link key={i} {...props} />
          )}
          {headStyles.map((style, i) =>
            <link
              key={i}
              href={style}
              type="text/css" rel="stylesheet" media="screen"
            />
          )}
          {stringScripts.map((script, i) =>
            <script key={i} dangerouslySetInnerHTML={{
              __html: script,
            }} />
          )}
          {libScripts.map((script, i) =>
            <script src={script} key={i} />
          )}
          {headScripts.map((script, i) =>
            <script src={script} key={i} />
          )}
        </head>
        <body>
          {content.map((props, i) =>
            <div key={i} {...props} />
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${
                JSON.stringify(initialState, null, 2)
                };`,
            }} />
          {stringScripts.map((script, i) =>
            <script key={i} dangerouslySetInnerHTML={{
              __html: script,
            }} />
          )}
          {bodyScripts.map((script, i) =>
            <script key={i} src={script} />
          )}
          {bodyStyles.map((style, i) =>
            <script key={i} dangerouslySetInnerHTML={{
              __html: `loadCSS('${style}')`,
            }} />
          )}
          {bodyStyles.map((style, i) =>
            <noscript key={i} dangerouslySetInnerHTML={{
              __html: `<link href="${style}" rel="stylesheet" />`,
            }} />
          )}
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  initialState: PropTypes.object,
  content: PropTypes.array,
  headScripts: PropTypes.array,
  stringScripts: PropTypes.array,
  bodyScripts: PropTypes.array,
  libScripts: PropTypes.array,
  headStyles: PropTypes.array,
  otherLinks: PropTypes.array,
};

Html.defaultProps = {
  content: [],
  headScripts: [],
  stringScripts: [],
  bodyScripts: [],
  libScripts: [],
  headStyles: [],
  bodyStyles: [],
  otherLinks: [],
};
