import { concat } from 'ramda'
import { homePageSaga } from 'app/sagas/homePage'

let sagas = []

sagas = concat(
  sagas,
  homePageSaga,
)

export default sagas
