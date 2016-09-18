import * as actionTypes from 'core/constants';

export function update(componentId, value) {
  return {
    type: actionTypes.HEADER_UPDATE,
    componentId, value
  };
};
