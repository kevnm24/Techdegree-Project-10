import React, { Component } from 'react';
import './styles/global.css';
import { Provider } from './components/Context'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

// these are the components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/Course-Detail';
import SignIn from './components/Sign-In';
import SignUp from './components/Sign-Up';
import CreateCourse from './components/Create-Course';
import UpdateCourse from './components/Update-Course';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: '',
      signedIn: false
    }
  }

// this will log in the user if their email address  and passwords are valid if not nothing will happend
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
         user: response.data,
         signedIn: true
       });
       sessionStorage.setItem("user", JSON.stringify(response.data))
       sessionStorage.setItem("auth", JSON.stringify(response.config.headers.Authorization))
     }
   })
   .catch(error => {
     if(error.response.status === 401) {
       this.setState({
          signedIn:false,
      });
     }
   })
  }

    render() {
      return (
        <Provider value={{
          user: this.state.user,
          signedIn: this.state.signedIn
        }}>
        <BrowserRouter>
          <div>
          <Route path='/' render={() => <Header />}/>
          <Route exact path='/' render={ () => <Redirect to='/courses'/>} />
          <Route exact path='/courses' render={() => <Courses />}/>
          <Route exact path='/courses/:detail' component={CourseDetail} />
          <Route path="/signIn" render={ () => <SignIn logIn={this.logIn} />}/>
          <Route exact path='/signUp' render={() => <SignUp logIn={this.logIn} />}/>
          <PrivateRoute exact path='/create-course' component={CreateCourse} />
          <PrivateRoute exact path='/courses/:detail/update' component={UpdateCourse}/>
          </div>
        </BrowserRouter>
        </Provider>
      );
    };
};
export default App;
