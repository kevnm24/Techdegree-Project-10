import React, { Component } from 'react';
import './styles/global.css';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// these are the components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/Course-Detail';

class App extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         items: [],
    //         isLoaded: false
    //     }
    // }
    // componentDidMount() {
    //     fetch('http://localhost:5000/api/courses')
    //         .then(res => res.json())
    //         .then(json => {
    //             this.setState({
    //                 isLoaded: true,
    //                 items: json
    //             })
    //         });
    // }
    // render() {
    //     var { isLoaded, items } = this.state;
    //     if (!isLoaded) {
    //         return <div>Loading...</div>;
    //     }
    //     return (
    //         <div className="App">
    //
    //             <ul>
    //                 {items.map(item => (
    //                     <li key="{item.id}">
    //                         Title: {item.title} | Description: {item.description}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // }

    render() {
      return (
        <BrowserRouter>
          <div>
          <Route path='/' render={() => <Header />}/>
          <Route exact path='/courses' render={() => <Courses />}/>
          <Route exact path='/courses/detail' render={() => <CourseDetail />}/>
          </div>
        </BrowserRouter>
      );
    };
};
export default App;
