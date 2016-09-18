import React from 'react';
import { connect } from 'react-redux';

import Header from 'core/components/Header';

import {
  getAdminHeader,
} from 'admin/selectors';

import { componentIds } from 'admin/constants';

const mapStateToProps = (state) => {
  return {
    header: getAdminHeader(state),
  };
}

class AdminPage extends React.Component {
  render() {
    const {
      header,
    } = this.props;

    return (
      <Header
        componentId={ componentIds.HEADER }
        value={ header }/>
    );
  }
}

export default connect(
  mapStateToProps
)(AdminPage);
