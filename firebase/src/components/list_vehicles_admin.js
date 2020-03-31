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
import firebase from "../config/fire";
class ListVehicles extends React.Component {
  state = {
    models: [],
    makes: []
  };

  onVehicleClick = vehicle => {
    history.push({
      pathname: "/vehicles/vehicleInfo",
      state: vehicle
    });
  };

  onCreateNewClick = () => {
    history.push({
      pathname: "/vehicles/postCar"
    });
  };

  render() {
    return (
      <div id="shani" style={{ marginTop: "20px", width: "96%", marginLeft: "2%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "flex-end"
          }}
        >
          <div style={{ marginTop: "7px", marginLeft: "auto" }}>
            <Button
              content="Post New Car"
              fluid
              inverted
              color="green"
              onClick={this.onCreateNewClick}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}></div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          {this.state.vehicles ? (
            this.state.vehicles.length > 0 ? (
              <Card.Group itemsPerRow={1}>
                {this.state.vehicles.map(
                  v => (
                    console.log(v),
                    (
                      <Card
                        key={v.vin_number}
                        link
                        onClick={() => this.onVehicleClick}
                      >
                        <img
                          src={
                            v.files
                              ? v.files[0].img
                              : "https://www.carsondemand.co.uk/public/images/placeholderCar.png"
                          }
                          alt=""
                          width={"50%"}
                          height={300}
                          style={{ margin: "auto" }}
                        />
                        <Card.Content style={{ color: "#2BB355" }}>
                          <b>{`${v.full_name} - ${v.phone_number}`}</b>
                        </Card.Content>
                        <Card.Content>
                          <Card.Description></Card.Description>
                          <Card.Description>
                            {v.car_model} - {v.car_make}
                          </Card.Description>
                          <br />
                          <Card.Description>{v.transmission}</Card.Description>
                        </Card.Content>
                        <Card.Content>
                          <Card.Description>
                            <Button
                              color="green"
                              floated="right"
                              content="Pay Now"
                            />
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    )
                  )
                )}
              </Card.Group>
            ) : (
              <Message
                warning
                header="Nothing to display."
                content="You have not posted any vehilce. Click on Post vehicle button at bottom of side panel to post your first vehicle."
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('auth')).email;
    firebase
      .database()
      .ref("CarAds")
      .on("value", snapshot => {
        let obj = snapshot.val();
        let arr = [];
        for (const key of Object.keys(obj)) {
          if(obj[key].user){
            if(obj[key].user===user){
              arr.push(obj[key]);
            }
          }
        }
        this.setState({ vehicles: arr });
      });
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
