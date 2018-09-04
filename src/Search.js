import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios'

const API_URL = 'https://api.uwaterloo.ca/v2';
const API_KEY = 'd62eb4cf89a63f8f74cc4b336b544df3';

async function loadData(address) {
  return axios.get(`${API_URL}/${address}.json?key=${API_KEY}`);
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [], courses: [], prereqs: {}, subject: {}, course: {}
    };
  }

  getSubjects = async () => {
    const resp = await loadData('codes/subjects')
    this.setState({
      subjects: resp.data.data.map(d =>{
        return ({ value: d.subject, label: d.subject})
      })
    })
  };

  getCourses = async () => {
    const resp = await loadData(`courses/${this.state.subject.value}`);
    this.setState({
      courses: resp.data.data.map(d => {
        return ({ value: d.catalog_number, label: d.catalog_number });
      })
    })
  };

  getPrereqs = async () => {
    const resp = await loadData(`courses/${this.state.subject.value}/${this.state.course.value}`)
    this.setState({
      prereqs: resp.data.data
    })
  };

  selectSubject = subject => {
    this.setState({
      subject: subject
    }, () => {
      this.setState({
        course: {},
        prereqs: {}
      });
      this.getCourses();
    });
  }

  selectCourse = course => {
    this.setState({
      course: course
    }, () => {
      this.setState({
        prereqs:  {}
      });
      this.getPrereqs();
    });
  }

  componentDidMount() {
    this.getSubjects();
  }

  render() {
    return (
      <div className="ClassSearch">
        <p>Select Subject</p>
        <Select
          className="SubjectSelect"
          options={this.state.subjects}
          value={this.state.subject}
          onChange={this.selectSubject}
        />
        <p>Select Course</p>
        <Select
          className="CourseSelect"
          options={this.state.courses}
          value={this.state.course}
          onChange={this.selectCourse}
        />
        <h4>Prerequisites:</h4>
        <p>{this.state.prereqs.prerequisites}</p>
      </div>
    );
  }
}

export default Search;

