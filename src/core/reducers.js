import { combineReducers } from 'redux';

import userReducers from 'user/reducers';
import adminReducers from 'admin/reducers';

export default combineReducers({
  user: userReducers,
  admin: adminReducers,
});

