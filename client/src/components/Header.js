import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from './Context';

class Header extends Component {

// this renders the html
logOut = () => {
  this.setState({
    signedIn: false
  })
  window.sessionStorage.clear();
  this.props.history.push('/courses');
}

  render(){

  return (
    <Consumer>
    {context =>{
      if(context.signedIn){
        return(
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
                <Link to='/signin' className="signin" onClick={this.logOut} >Sign Out</Link>
              </nav>
            </div>
          </div>
        )
      } else {
        return(
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
                <Link to='/signUp' className="signup">Sign Up</Link>
                <Link to='/signIn' className="signin">Sign In</Link>
              </nav>
            </div>
          </div>
        )
      }
    }}
    </Consumer>
    );
  }
}

export default Header;
