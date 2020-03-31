import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchVehicleRequest } from "../stateContainer/actions/vehicleActions";
import {
  Card,
  Dropdown,
  Button,
  Divider,
  Header,
  Message
} from "semantic-ui-react";
import history from "../routes/history";
import logo from '../assets/Mainlogo.png'
class ListVehicles extends React.Component {
  state = {};
  render() {
    return (
      <div style={{ marginTop: "20px", width: "96%", marginLeft: "2%" }}>
                <div style={{ width: '100%', paddingTop: '7px', display: 'flex', flexFlow: 'wrap', justifyContent: 'start' }}>
                   <img src={logo} alt="logo" width="150px"/>
                </div>
                <div style={{ width: '100%', paddingTop: '7px', display: 'flex', 
                flexFlow: 'wrap', justifyContent: 'center' }}>
                   <h3 style={{color:"red"}}>Sell to Us</h3>
                </div>
                <div style={{ width: '100%', paddingTop: '7px', display: 'flex', 
                flexFlow: 'wrap', justifyContent: 'start' }}>
                    <ol>
                        <li>
                            <h3>
                                Match our search requirements
                            </h3>
                        </li>
                        <li>
                            <h3>
                                Give us the best offer
                            </h3>
                        </li>
                        <li>
                            <h3>
                                Send us the photos, vehicle description and
                                your best price. 
                            </h3>
                        </li>
                    </ol>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListVehicles);
