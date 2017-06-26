import { fromJS } from 'immutable'
import { createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/composition/middleware'

const log = debug('set-store')

export default function *setStore(next) {
  log('setting server store')
  const {
    intl,
    location,
  } = this.state
  const initialState = fromJS({
    intl,
    location,
  })

  this.store = makeCreateStore(middleware)(rootReducer, initialState)
  syncHistoryWithStore(createMemoryHistory(this.request.url), this.store, {
    selectLocationState: (state) => state.get('routing').toJS(),
  })
  yield next
}
