import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: []
    };
  }

  componentDidMount() {
    axios.get('/api/patient')
        .then(res => {
          this.setState({patients: res.data});
          console.log(this.state.patients);
        });
  }

  render() {
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-lastname">
                PATIENTS CATALOG
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Patient</Link>
              </h4>
              <table class="table table-stripe">
                <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Birthday</th>
                </tr>
                </thead>
                <tbody>
                {this.state.patients.map(patient =>
                    <tr>
                      <td><Link to={`/show/${patient._id}`}>{patient.firstname}</Link></td>
                      <td>{patient.lastname}</td>
                      <td>{moment(patient.birthday).format('DD.MM.YYYY')}</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
