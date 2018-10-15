import { Route, IndexRoute } from 'react-router';
import { ERROR_PATH } from 'config/paths';

import App from 'app/components/App/App';
import HomePage from 'app/containers/HomePage';
import OopsRoute from 'app/routes/OopsRoute';
import NotFoundRoute from 'app/routes/NotFoundRoute';

export const makeRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path={ERROR_PATH} component={OopsRoute} />
    <Route path="*" component={NotFoundRoute} />
  </Route>
);

export default makeRoutes;
