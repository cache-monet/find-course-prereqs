import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios'

const API_URL = 'https://api.uwaterloo.ca/v2';
const API_KEY = 'd62eb4cf89a63f8f74cc4b336b544df3';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [], courses: [], prereqs: {}, subject: {}, course: {}
    };
  }
  getSubjects = () => {
    axios.get(`${API_URL}/codes/subjects.json?key=${API_KEY}`)
    .then(({ data }) => {
      this.setState({
        subjects: data.data.map(d => {
          return ({ value: d.subject, label: d.subject })
        })
      })
    })
  };
  getCourses = () => {
    axios.get(`${API_URL}/courses/${this.state.subject.value}.json?key=${API_KEY}`)
    .then(({ data }) => {
      this.setState({
        courses: data.data.map(d => {
          return ({value: d.catalog_number, label: d.catalog_number});
        })
      })
    })
  };

  getPrereqs= () => {
    axios.get(`${API_URL}/courses/${this.state.subject.value}/${this.state.course.value}.json?key=${API_KEY}`)
    .then(({ data }) => {
      this.setState({
       prereqs: data.data
      })
    })

  };
  selectSubject = subject => {
    this.setState({
      subject: subject
    }, () => {
      this.state.course = {};
      this.state.prereqs = {};
      this.getCourses();
    });
  }
  selectCourse = course => {
    this.setState({
      course: course
    }, () => {
      this.state.prereqs = {};
      this.getPrereqs();
    });
  }

  componentDidMount() {
    this.getSubjects();
  }

  render() {
    return (
      <div className="ClassSearch">
        <Select
          placeholder='Select Subject'
          className="SubjectSelect"
          options={this.state.subjects}
          value={this.state.subject}
          onChange={this.selectSubject}
        />
        <Select
          placeholder='Select Course'
          className="CourseSelect"
          options={this.state.courses}
          value={this.state.course}
          onChange={this.selectCourse}
        />
        <p>{this.state.prereqs.prerequisites}</p>
      </div>
    );
  }
}

export default Search;

