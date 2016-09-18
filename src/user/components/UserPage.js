import React from 'react';
import { connect } from 'react-redux';

import Header from 'core/components/Header';

import {
  getUserHeader,
} from 'user/selectors';

import { componentIds } from 'user/constants';

const mapStateToProps = (state) => {
  return {
    header: getUserHeader(state),
  };
}

class UserPage extends React.Component {
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
)(UserPage);
