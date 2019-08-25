import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: {}
    };
  }

  componentDidMount() {
    axios.get('/api/patient/'+this.props.match.params.id)
      .then(res => {
        this.setState({ patient: res.data });
        console.log(this.state.patient);
      });
  }

  onChange = (e) => {
    const state = this.state.patient
    state[e.target.name] = e.target.value;
    this.setState({patient:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, birthday } = this.state.patient;

    axios.put('/api/patient/'+this.props.match.params.id, { firstname, lastname, birthday })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-lastname">
              EDIT PATIENT
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.patient._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Patient List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="firstname">Firstname:</label>
                <input type="text" required class="form-control" name="firstname" value={this.state.patient.firstname} onChange={this.onChange} placeholder="Firstname" />
              </div>
              <div class="form-group">
                <label for="lastname">Lastname:</label>
                <input type="text" required class="form-control" name="lastname" value={this.state.patient.lastname} onChange={this.onChange} placeholder="Lastname" />
              </div>
              <div class="form-group">
                <label for="birthday">birthday:</label>
                <input type="date" required max="9999-12-31" class="form-control" name="birthday" value={this.state.patient.birthday} onChange={this.onChange} placeholder="birthday" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
