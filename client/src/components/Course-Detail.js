import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {

  constructor() {
      super();
      this.state = {
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
// this renders the html
  render() {
    const {isLoaded, courses} = this.state;
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
                  <h3 class="course--title">{courses.title}</h3>
                  <p>By Joe Smith</p>
                </div>
                <div class="course--description">
                  <ReactMarkdown>{courses.description}</ReactMarkdown>
                </div>
              </div>
              <div class="grid-25 grid-right">
                <div class="course--stats">
                  <ul class="course--stats--list">
                    <li class="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{courses.estimatedTime}</h3>
                    </li>
                    <li class="course--stats--list--item">
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

export default CourseDetail;
