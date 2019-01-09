import React, { Component } from 'react';
import './styles/global.css';
import { Provider } from './components/Context'
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import axios from 'axios';

// these are the components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/Course-Detail';
import SignIn from './components/Sign-In';
import SignUp from './components/Sign-Up';

class App extends Component {

  constructor() {
    super();
    this.state = {
      signedIn: false,
      user: ''
    }
  }

  logIn = (email, password) => {
    axios.get('http://localhost:5000/api/users', {
      auth: {
        username: email,
        password: password
     }
   })
   .then(response => {
     if(response.status === 200 || response.status === 304) {
       this.setState({
         signedIn: true
       });
     }
   })
   .catch(error => {
     if(error.response.status === 401) {
       this.setState({
         signedIn: false
       })
     }
   })
  }

  logOut = () => {
    localStorage.clear();
    this.props.history.push('/signIn');
  }

    render() {
      return (
        <Provider value={{
          signedIn: this.state.signedIn
        }}>
        <BrowserRouter>
          <div>
          <Route path='/' render={() => <Header logOut={this.logOut} />}/>
          <Route exact path='/courses' render={() => <Courses />}/>
          <Route exact path='/courses/:detail' component={CourseDetail} />
          <Route path="/signIn" render={ () => <SignIn logIn={this.logIn} />}/>
          <Route exact path='/signUp' render={() => <SignUp />}/>
          </div>
        </BrowserRouter>
        </Provider>
      );
    };
};
export default App;
