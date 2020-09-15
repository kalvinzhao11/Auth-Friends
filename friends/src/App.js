import React from 'react';
import { Switch, Route, Link} from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Friend from './components/Friend'

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
      <Switch>
        <ProtectedRoute exact path="/protected" component={Friend}/>
        <Route path='/login' component={Login}/>
        <Route path='/'/>
      </Switch>
    </div>
  );
}

export default App;
