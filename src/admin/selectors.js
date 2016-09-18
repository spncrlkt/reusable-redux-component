import {
  getHeaderText,
} from 'core/components/Header/selectors';

export const getAdminHeader = (state) => getHeaderText(state.admin.header);
