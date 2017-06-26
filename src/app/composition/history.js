import { isBrowser } from 'app/utils'
import { browserHistory, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { store } from 'app/composition/store'

export const history = isBrowser
  ? syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.get('routing').toJS(),
  })
  : createMemoryHistory()
