import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actionCreators';

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  handleEditingToggle = () => {
    const {
      isEditing
    } = this.state;

    this.setState({
      isEditing: !isEditing,
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleEditingToggle();
    }
  }

  handleChange = (e) => {
    const {
      update,
      componentId,
    } = this.props;

    update(componentId, e.target.value);
  }

  render() {
    const {
      value,
    } = this.props;

    const {
      isEditing,
    } = this.state;

    return (
      <span>
        { isEditing ? (
          <input
            type='text'
            value={ value }
            onChange={ this.handleChange }
            onKeyPress={ this.handleKeyPress }
            onBlur={ this.handleEditingToggle }/>
        ) : (
          <h1 onClick={ this.handleEditingToggle }>
            { value }
          </h1>
        )}
      </span>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Header);
