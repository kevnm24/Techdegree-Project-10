import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Consumer} from './Context';

class CourseDetail extends Component {

  constructor(props) {
      super(props);
      this.state = {
          courses: [],
          isLoaded: false
      };
  };

  componentDidMount() {
      fetch(`http://localhost:5000/api/courses/${this.props.match.params.detail}`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                courses: json
            });
        });
  };

  deleteCourse() {
    let axiosConfig = {headers: {'Authorization': JSON.parse(window.localStorage.getItem('auth'))}};
    axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.detail}`, axiosConfig)
    .then(response => {
      this.props.history.push('/courses')
    })
  };

  handleDelete = e => {
    e.preventDefault()
    this.deleteCourse()
  }

// this renders the html
  render() {
    let userId = JSON.parse(window.localStorage.getItem('user'))
    const {isLoaded, courses} = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    };
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            <Consumer>
            {context => {
              if(context.signedIn && userId._id === courses.user){
                return(
                  <span><Link to={`/courses/${courses._id}/update`} className="button">Update Course</Link><button className="button" onClick={this.handleDelete}>Delete Course</button></span>
                )
              } else {
                return(
                  <span></span>
                )
              }
            }}
            </Consumer>
              <Link to='/' className="button button-secondary" href="index.html">Return to List</Link>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{courses.title}</h3>
                <p>By {courses.firstName} {courses.lastName}</p>
              </div>
              <div className="course--description">
                <ReactMarkdown>{courses.description}</ReactMarkdown>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{courses.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      <ReactMarkdown>{courses.materialsNeeded}</ReactMarkdown>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(CourseDetail);
