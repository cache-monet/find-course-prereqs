import React, { Component } from 'react';
import Select from 'react-select';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [], courses: [], prereqs: {}, subject: {}, course: {}
    };
  }
  getSubjects = () => {

  };
  getCourses = () => {

  };
  getPrereqs= () => {

  };
  selectSubject = () => {
  }
  selectCourse = () => {
  }

  render() {
    return (
      <div className="ClassSearch">
        <Select
          className="SubjectSelect"
          options={this.state.subjects}
          value={this.state.subject}
          onChange={this.selectSubject}
        />
        <Select
          className="CourseSelect"
          options={this.state.courses}
          value={this.state.course}
          onChange={this.selectCourse}
        />
      </div>
    );
  }

}

export default Search;

