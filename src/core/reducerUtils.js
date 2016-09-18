export const componentIdFilter = (componentId, reducer, initalState) =>
  (state = initalState, action) => {
    if (action.componentId === componentId) {
     return reducer(state, action);
    }
    return state;
  }
