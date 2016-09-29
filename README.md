Reusable React-Redux Connected Component
=====================

## Overview

A simple method for creating reusable React-Redux connected components.

## Checkout && run

```
git clone git@github.com:spncrlkt/reusable-redux-component.git && cd reusable-redux-component
npm install
npm start
open http://localhost:3000
```

## Motivating example

For large React/Redux apps, we'll want to have separate domains for sub-sections of our app.
We'll want our core components shared among our domains,
and we'll want our core components to manage state in each of our domains.

Consider the following directory structure:

```
src/
  core/
    components/
      Header/
        index.js
        Header.js
        actionCreators.js
        reducers.js
        selectors.js
    reducers.js
  admin/
    components/
      AdminPage.js
    reducers.js
  user/
    components/
      UserPage.js
    reducers.js
  index.js
```

Our state atom looks like:

```
user {
  header {
    text
  }
}
admin {
  header {
    text
  }
}
```

Our Header component is one of those new-fangled inline-editable inputs.
When we click on it, we want it to turn into an input field.
We can edit the text inside of it, and then when we hit 'Enter' or onBlur,
we want it to return to its original header display.
Not extremely complicated, but we don't want to duplicate that logic for each of our domains.

We want to share the Header component in our `admin` and `user` domains,
and we want the Header to control the state inside those domains.


## Header Component

Our Header component directory contains:

- Header.js - React component
- actionCreators.js - our component will import and dispatch these
- reducers.js - our domain reducers will import these for state management
- selectors.js - our domain selectors will import these to read from state


### Header.js

```javascript
import * as actionCreators from './actionCreators';

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
```

Here we've imported our component's actionCreators and bound them to dispatch().
Our header component will be responsible for dispatching these actions as needed.

```javascript
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
```

These class methods will handle toggling `this.state.isEditing`,
which our render method will use to display an `<h1>` or an `<input>`.

```javascript
handleChange = (e) => {
  const {
    update,
    componentId,
  } = this.props;

  update(componentId, e.target.value);
}
```
Our component will dispatch an update() bound action creator.
We'll talk more about that `componentId` in our domain code.

```javascript
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
```

`this.props.value` is passed in from our domain code.
Render an input if we're in editing mode, else render a header.

### reducers.js

```javascript
export const getHeaderInitialState = (text) => ({
  text,
});
```

We're creating a function to generate an initial state,
allowing our Header component to manage all aspects of state management.
If our initial state shape changes, we'll only need to update it in one place.

```javascript
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
```

Our reducer is pretty simple: update `text` with the value dispatched from our Header component.

We're using `componentIdFilter` to filter our shared reducers by componentId

```javascript
// src/core/reducerUtils.js

export const componentIdFilter = (componentId, reducer, initalState) =>
  (state = initalState, action) => {
    if (action.componentId === componentId) {
     return reducer(state, action);
    }
    return state;
  }
```

This will check actions against a per instance componentId,
so actions dispatched by one instance of our Header don't
effect state corresponding to another instance.

### selectors.js

```javascript
export const getHeaderText = (state) => state.text
```

Pretty straight forward, but it bears repeating:
we want all state management logic to be encapsulated in our shared component,
including reading from state.


## User Domain

We'll use the `user` domain to show how to wire up our reusable Header component.
The admin domain will follow the exact same pattern.


### constants.js

```javascript
const HEADER = 'user/HEADER';

export const componentIds = {
  HEADER,
}
```

We export our componentIds as namespaced constants.
Namespacing helps with debugging by pointing out where this action will effect state.

### selectors.js

```javascript
import {
  getHeaderText,
} from 'core/components/Header/selectors';

export const getUserHeader = (state) => getHeaderText(state.user.header);
```

We use the selector we created for Header
to access the internals of the slice of state related to the user header.
Notice that if the internal representation of Header's state changes,
this selector won't need to be modified since we've abstracted that access.

### reducers.js

```javascript
import {
  header,
  getHeaderInitialState,
} from 'core/components/Header/reducers';

import { componentIds } from 'user/constants';

export default combineReducers({
  header: header(componentIds.HEADER, getHeaderInitialState('User')),
});
```

We import `header` and `getHeaderInitialState` from our Header component.
In our combineReducers call, we delegate state management to the reusable reducer.
We provide a componentId to limit access,
and provide an initial state.

### UserPage.js

```javascript
import Header from 'core/components/Header';

import {
  getUserHeader,
} from 'user/selectors';

import { componentIds } from 'user/constants';
```

We import our shared Header component, our `getUserHeader` selector, and our componentIds.

```javascript
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
```

Our Header component just needs the componentId and the value of the header.

## Concluding thoughts

We've shown a way to share components and
their related state management logic among several app domains.
Code that is specific to state updates and data access is
colocated with the shared component, and reusable by domain.
If the component gets more complex, our domain code shouldn't need to change.

The reusable component's API is:
reusing reducer functions in the domain's reducers and
rendering the component with a componentId and its associated data,
which is accessed through a reusable selector.
