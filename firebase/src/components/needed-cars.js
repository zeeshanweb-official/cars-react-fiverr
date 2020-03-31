import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchVehicleRequest } from '../stateContainer/actions/vehicleActions';
import { Grid } from 'semantic-ui-react';
import history from '../routes/history';
import logo from '../assets/Mainlogo.png';
import firebase from '../config/fire';
class NeedeCars extends React.Component {
  state = {};
  componentDidMount() {
    firebase
      .database()
      .ref('UrgentlyNeededCars')
      .on('value', snapshot => {
        let obj = snapshot.val();
        let arr = [];
        for (const key of Object.keys(obj)) {
          arr.push(obj[key]);
        }
        this.setState({ needed_cars: arr });
      });
    // Object.values(this.state.needed_cars).forEach(value => {
    //   console.log(value);
    // });
  }
  render() {
    return (
      <div style={{ marginTop: '20px', width: '96%', marginLeft: '2%' }}>
        <div
          style={{
            width: '100%',
            paddingTop: '7px',
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'start'
          }}>
          <img src={logo} alt='logo' width='150px' />
        </div>
        <div
          style={{
            width: '100%',
            paddingTop: '7px',
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'center'
          }}>
          <h3 style={{ color: 'red' }}>Sell to Us</h3>
        </div>
        <div
          style={{
            width: '100%',
            paddingTop: '7px',
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'start'
          }}>
          <ol>
            <li>
              <h3>Match our search requirements</h3>
            </li>
            <li>
              <h3>Give us the best offer</h3>
            </li>
            <li>
              <h3>
                Send us the photos, vehicle description and your best price.
              </h3>
            </li>
          </ol>
        </div>
        <div style={{ width: '96%', marginLeft: '2%' }}>
          <Grid>
            <Grid.Row>
              {this.state.needed_cars
                ? this.state.needed_cars.map(item => {
                    return (
                      <Grid.Column
                        mobile={16}
                        tablet={16}
                        computer={8}
                        width={8}
                        style={{ marginTop: '20px' }}>
                        <h5 style={{ margin: '0px' }}>
                          Contact Number: {item.data.cellphone}
                        </h5>
                        <h5 style={{ margin: '0px' }}>
                          Car: {item.data.car_make}
                        </h5>
                        <h5 style={{ margin: '0px' }}>
                          Model: {item.data.car_model}
                        </h5>
                        <h5 style={{ margin: '0px' }}>
                          Engine: {item.data.engine_capacity}
                        </h5>
                        <h5 style={{ margin: '0px' }}>
                          Condtion: {item.data.condition}
                        </h5>
                      </Grid.Column>
                    );
                  })
                : ''}
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchVehicles: fetchVehicleRequest
};

const mapStateToProps = ({ vehicles }) => {
  return {
    vehicles: vehicles.vehicles
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NeedeCars);
