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
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span>
                <a className="button button-secondary" href="index.html">Return to List</a>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{courses.title}</h3>
                  <p>By Joe Smith</p>
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

export default CourseDetail;
