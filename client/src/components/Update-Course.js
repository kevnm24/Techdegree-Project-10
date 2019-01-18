import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class UpdateCourse extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: ''
    }
  }

  updateCourse = (title, description, estimatedTime, materialsNeeded) => {
    let axiosConfig = {headers: {'Authorization': JSON.parse(window.sessionStorage.getItem('auth'))}};
    axios.put(`http://localhost:5000/api/courses/${this.props.match.params.detail}`, {
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
    this.updateCourse(this.state.title, this.state.description, this.state.estimatedTime, this.state.materialsNeeded)
  }
// this renders the html
  render(){
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
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
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary">Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;
