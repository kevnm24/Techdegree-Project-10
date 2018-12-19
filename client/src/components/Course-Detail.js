import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CourseDetail extends Component {

  constructor(props) {
      super(props);
      this.state = {
          courses: [],
          isLoaded: false
      };
  };
  componentDidMount() {
      fetch('http://localhost:5000/api/courses')
          .then(res => res.json())
          .then(json => {
              this.setState({
                  isLoaded: true,
                  courses: json
              });
          });
  };
// this renders the html
  render() {
    var {isLoaded, courses} = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    };
    return (
      <div>
        <div class="actions--bar">
          <div class="bounds">
            <div class="grid-100">
              <span><a class="button" href="update-course.html">Update Course</a><a class="button" href="#">Delete Course</a></span>
              <a class="button button-secondary" href="index.html">Return to List</a>
            </div>
          </div>
          <div class="bounds course--detail">
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Course</h4>
                <h3 class="course--title">Build a Basic Bookcase</h3>
                <p>By Joe Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default CourseDetail;
