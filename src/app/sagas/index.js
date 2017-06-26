import { concat } from 'ramda'
import { homePageSaga } from 'app/containers/HomePage/sagas'

let sagas = []

sagas = concat(
  sagas,
  homePageSaga,
)

export default sagas
