import React from "react";
import axios from "axios";
import { Card, Form, Message } from "semantic-ui-react";
import { VehicleInfoForm } from "./post_vehicle_info_form";
import { VehicleImagesForm } from "./post_vehicle_info_images";
import { VehicleOwnerInfoForm } from "./post_vehicle_owner_info_form";
import { Checkout } from "./post_vehicle_checkout";
import { DOMAIN_URL } from "../api";
import "../App.css";
import Db from "../csvjson (1).json";
import firebase from '../config/fire'
import history from '../routes/history'
class PostVehicleMainForm extends React.Component {
  /**
   * Pages I need
   * 1. vehicle Info
   * 2. Vehicle Images
   * 3. Owner Info
   *
   **/
  state = {
    models: [],
    makes: [],
    success: -1,
    message: "",
    step: 1,
    car_make: "",
    car_model: "",
    car_type: "",
    year: "",
    mileage: "",
    transmission: "",
    condition: "",
    vin_number: "",
    plate_number: "",
    price: "",
    county: "",
    town: "",
    full_name: "",
    phone_number: "",
    files: []
  };
  componentDidMount = () => {
   
    let makearr = [];
    Db.carmake.map(item => {
      makearr.push({
        key: item.make,
        text: item.make,
        value: item.make,
        id: item.id
      });
    });
    this.setState({ makes: makearr });
  };
  onDropDownChange = (event, data) => {
    let modelArr = [];
    Db.model_makeid.map(item => {
      if (item.make === data.value) {
        modelArr.push({
          key: item.model,
          text: item.model,
          value: item.model,
          id: item.id
        });
      }
    });
    this.setState({ models: modelArr, car_make: data.value });
    // axios.get(`https://car-listing-api.herokuapp.com/models/${value}`)
    //     .then(response => {
    //         let models = response.data.map(model => {
    //             return {key:model.id, value:model.id, text:model.model}
    //         })
    //         this.setState({models, [name]: value })
    //     })
    //     .catch(error => {

    //     })
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  nextStep_ = data => {
    const { step } = this.state;
    this.setState({
      files: data,
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheckedChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("auth")).email;
    let files = [];
    if (this.state.files[0].img) {
      this.state.files.filter(item => {
        if (item.img) {
          files.push(item);
        }
      });
    } else {
      alert("Cover image is nessessary to post a vehicle");
    }
    let stateToSend = this.state;
    delete stateToSend.models
    delete stateToSend.makes
    stateToSend.files = files
    stateToSend.user = user
    firebase.database().ref('CarAds').push(stateToSend)
    .then(res => {
        console.log(res.getKey()) // this will return you ID
        history.push('/admin/vehicles/')
        
    })
    .catch(error => console.log(error));
  };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  render() {
    const { step } = this.state;
    const { condition, transmission } = this.state;
    let Component;
    switch (step) {
      case 1:
        Component = (
          <VehicleInfoForm
            makes={this.state.makes}
            models={this.state.models}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            condition={condition}
            transmission={transmission}
            handleDropDown={this.onDropDownChange}
            handleCheckedChange={this.handleCheckedChange}
            handleChange={this.handleChange}
          />
        );
        break;
      case 2:
        Component = (
          <VehicleImagesForm
            nextStep={this.nextStep_}
            prevStep={this.prevStep}
          />
        );
        break;
      case 3:
        Component = (
          <VehicleOwnerInfoForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleCheckedChange={this.handleCheckedChange}
            handleChange={this.handleChange}
          />
        );
        break;
      case 4:
        Component = (
          <Checkout
            onSubmit={this.handleSubmit}
            prevStep={this.prevStep}
            data={this.state}
          />
        );
        break;
      default:
        Component = <div>{""}</div>;
        break;
    }
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginTop: "20px"
        }}
      >
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}>
          {this.state.success > -1 && (
            <Message
              content={this.state.message}
              error={this.state.success === 0}
              success={this.state.success === 1}
            />
          )}
          <Form onSubmit={this.handleSubmit} style={{marginLeft:"4px",width: "99.5%"}}>
            <Card fluid>{Component}</Card>
          </Form>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    );
  }

  // componentDidMount(){
  //     axios.get('https://car-listing-api.herokuapp.com/car_makes')
  //         .then(response => {
  //             let makes = response.data
  //             let newMakes = makes.map(make=>{
  //                 return {key:make.id, text: make.make, value: make.id}
  //             })

  //             this.setState({
  //                 makes:newMakes
  //             })
  //         })
  //         .catch(error => {

  //         })
  // }
}

export default PostVehicleMainForm;
