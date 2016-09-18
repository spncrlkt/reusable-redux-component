import * as actionTypes from 'core/constants';

import { componentIdFilter } from 'core/reducerUtils.js';

export const getHeaderInitialState = (text) => ({
  text,
});

function _header(state, action) {
  switch (action.type) {
    case actionTypes.HEADER_UPDATE:
      return Object.assign({}, state, {
        text: action.value,
      });
    default:
      return state;
  }
}

export const header = (componentId, initialState) =>
  componentIdFilter(componentId, _header, initialState);
