import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
var moment = require('moment');
class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: {
      }
    };
  }


  componentDidMount() {
    axios.get('/api/patient/'+this.props.match.params.id)
      .then(res => {
        this.setState({ patient: res.data });
        console.log(this.state.patient);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/patient/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-lastname">
              {this.state.patient.lastname} - {this.state.patient.firstname}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Patient List</Link></h4>
            <dl>
              <dt>Firstname:</dt>
              <dd>{this.state.patient.firstname}</dd>
              <dt>Lastname:</dt>
              <dd>{this.state.patient.lastname}</dd>
              <dt>birthday:</dt>
              <dd class="date">{moment(this.state.patient.birthday).format('DD.MM.YYYY')}</dd>
            </dl>
            <Link to={`/edit/${this.state.patient._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.patient._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
