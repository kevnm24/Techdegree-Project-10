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
       localStorage.setItem("user", JSON.stringify(response.data))
       localStorage.setItem("auth", JSON.stringify(response.config.headers.Authorization))
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

  componentDidMount() {
    if(localStorage.user){
      let user = JSON.parse(window.localStorage.getItem('user'))
      this.logIn(user.emailAddress, user.password)
    }
  }

    render() {
      return (
        <Provider value={{
          user: this.state.user,
          signedIn: this.state.signedIn,
          actions: {
            create: this.createCourse,
            logIn: this.logIn,
          }
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
