import { combineReducers } from 'redux';

import {
  header,
  getHeaderInitialState,
} from 'core/components/Header/reducers';

import { componentIds } from 'user/constants';

export default combineReducers({
  header: header(componentIds.HEADER, getHeaderInitialState('User')),
});
