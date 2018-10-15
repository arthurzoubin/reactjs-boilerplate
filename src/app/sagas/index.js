import { arrayConcat } from 'app/utils';
import { homePageSaga } from 'app/sagas/homePage';

const sagas = arrayConcat([
  homePageSaga,
]);

export default sagas;
