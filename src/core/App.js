import React from 'react'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import Link from 'react-router/Link'
import Redirect from 'react-router/Redirect'
import Router from 'react-router/BrowserRouter'

import AdminPage from 'admin/components/AdminPage';
import UserPage from 'user/components/UserPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/user">User</Link></li>
          </ul>

          <hr/>

          <Match exactly pattern="/" component={Home} />
          <Match pattern="/admin" component={AdminPage} />
          <Match pattern="/user" component={UserPage} />
        </div>
      </Router>
    )
  }
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)

export default App
