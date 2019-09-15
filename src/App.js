import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from './components/Navbar';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import post from './pages/post';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTH} from './redux/types';
import { getUserData } from './redux/actions/userActions';

//Auth
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()){
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    window.location.href = '/';
  }
  else {
    store.dispatch({ type: SET_AUTH }); 
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/post" component={post} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
