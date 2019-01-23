import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: ''
    }
  }

  newCourse = (title, description, estimatedTime, materialsNeeded) => {
    let axiosConfig = {headers: {'Authorization': JSON.parse(window.localStorage.getItem('auth'))}};
    let userId = JSON.parse(window.localStorage.getItem('user'))
    axios.post('http://localhost:5000/api/courses', {
      user: userId._id,
      firstName: userId.firstName,
      lastName: userId.lastName,
      title: title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded
   }, axiosConfig)
   .then(response => {
     this.props.history.push('/courses')
   })
   .catch(function (error) {
    console.log(error);
   });
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.newCourse(this.state.title, this.state.description, this.state.estimatedTime, this.state.materialsNeeded)
  }

// this renders the html
  render(){
    let titleVal = null;
    let descVal = null;
    let headingVal = null;
    if (this.state.title === '') {
      titleVal = <li>Please provide a value for "Title"</li>
      headingVal = <h2 className="validation--errors--label">Validation errors</h2>
    } else {
      titleVal = <li></li>
    }
    if (this.state.description === '') {
      descVal = <li>Please provide a value for "Description"</li>
      headingVal = <h2 className="validation--errors--label">Validation errors</h2>
    } else {
      descVal = <li></li>
    }
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            {headingVal}
            <div className="validation-errors">
              <ul>
                {titleVal}
                {descVal}
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleChange} value={this.state.title}></input></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange} value={this.state.description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.handleChange} value={this.state.estimatedTime}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleChange} value={this.state.materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <Link to='/' className="button button-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default withRouter (CreateCourse);
