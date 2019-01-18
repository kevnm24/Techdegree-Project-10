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
    let axiosConfig = {headers: {'Authorization': JSON.parse(window.sessionStorage.getItem('auth'))}};
    let userId = JSON.parse(window.sessionStorage.getItem('user'))
    axios.post('http://localhost:5000/api/courses', {
      user: userId._id,
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
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onBlur={this.handleChange}></input></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onBlur={this.handleChange}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onBlur={this.handleChange}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onBlur={this.handleChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default withRouter (CreateCourse);