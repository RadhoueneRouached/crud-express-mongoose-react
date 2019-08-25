import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      birthday: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, birthday} = this.state;

    axios.post('/api/patient', { firstname, lastname, birthday })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { firstname, lastname, birthday} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-lastname">
              ADD PATIENT
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Patient List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="firstname">Firstname:</label>
                <input type="text" class="form-control" required name="firstname" value={firstname} onChange={this.onChange} placeholder="Firstname" />
              </div>
              <div class="form-group">
                <label for="lastname">Lastname:</label>
                <input type="text" class="form-control" required name="lastname" value={lastname} onChange={this.onChange} placeholder="Lastname" />
              </div>
              <div class="form-group">
                <label for="birthday">birthday:</label>
                <input type="date" max="9999-12-31" class="form-control" required name="birthday" value={birthday} onChange={this.onChange} placeholder="Birthday" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
