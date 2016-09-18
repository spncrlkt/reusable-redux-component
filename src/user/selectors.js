import {
  getHeaderText,
} from 'core/components/Header/selectors';

export const getUserHeader = (state) => getHeaderText(state.user.header);
