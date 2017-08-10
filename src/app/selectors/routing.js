const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.getIn([ 'routing','locationBeforeTransitions' ])
    if(typeof prevRoutingState === 'undefined' || !prevRoutingState.equals(routingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }
    return prevRoutingStateJS
  }
}

export {
  selectLocationState,
}
