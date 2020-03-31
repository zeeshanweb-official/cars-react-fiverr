import React from 'react'
import axios from 'axios'
import { Card, Form, Message} from "semantic-ui-react";
import {VehicleInfoForm} from "./post_vehicle_info_form";
import {VehicleImagesForm} from "./post_vehicle_info_images";
import {VehicleOwnerInfoForm} from "./post_vehicle_owner_info_form";
import { Checkout } from "./post_vehicle_checkout";
import {DOMAIN_URL} from '../api'
import '../App.css';

class PostVehicleMainForm extends React.Component{

    /**
    * Pages I need
    * 1. vehicle Info
    * 2. Vehicle Images
    * 3. Owner Info
    *
    **/
    state = {
        models:[],
        makes:[],
        'success': -1,
        'message': '',
        step: 1,
        car_make: '',
        car_model: '',
        car_type: '',
        year: '',
        mileage: '',
        transmission: '',
        condition: '',
        vin_number: '',
        plate_number: '',
        price: '',
        county: '',
        town: '',
        full_name: '',
        phone_number: '',
        files: []
    };

    onDropDownChange = (event, {name, value}) => {
        axios.get(`https://car-listing-api.herokuapp.com/models/${value}`)
            .then(response => {
                let models = response.data.map(model => {
                    return {key:model.id, value:model.id, text:model.model}
                })
                this.setState({models, [name]: value })
            })
            .catch(error => {

            })
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step + 1
        })
    };

    nextStep_ = (data) => {
        const { step } = this.state;
        this.setState({
            files: data,
            step : step + 1
        })
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step : step - 1
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckedChange = (e, {name, value}) => {
        this.setState({ [name]: value })
    }

    formatFormData = (state) => {
        let formData = new FormData()
        formData.append('full_name', state.full_name)
        formData.append('phone_number', state.phone_number)
        formData.append('plate_number', state.plate_number)
        formData.append('car_make', state.car_make)
        formData.append('car_model', state.car_model)
        formData.append('car_type', state.car_type)
        formData.append('year', state.year)
        formData.append('mileage', state.mileage)
        formData.append('transmission', state.transmission)
        formData.append('condition', state.condition)
        formData.append('vin_number', state.vin_number)
        formData.append('price', state.price)
        formData.append('county', state.county)
        formData.append('town', state.town)
        for (let i = 0; i < this.state.files.length; i++) {
            formData.append("files", this.state.files[i])
        }
        return formData
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const formData = this.formatFormData(this.state)
        axios.post(`${DOMAIN_URL}/vehicles`, formData)
            .then(result => {
                console.log(result)
                this.setState({
                    success: 1,
                    message: 'Successfully Submitted'
                })
            }).catch(error => {
                console.log(error)
                this.setState({
                    success: 0,
                    message: 'Failed to submit'
                })
            })
    }

    handleChange = this.handleChange.bind(this)
    handleSubmit = this.handleSubmit.bind(this)

    render() {
        const {step} = this.state;
        const { condition, transmission } = this.state
        let Component;
        console.log(this.state)
        switch (step) {
            case 1:
                Component = <VehicleInfoForm
                    makes={this.state.makes}
                    models={this.state.models}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    condition={condition}
                    transmission={transmission}
                    handleDropDown={this.onDropDownChange}
                    handleCheckedChange={this.handleCheckedChange}
                    handleChange={this.handleChange}
                />;
                break;
            case 2:
                Component = <VehicleImagesForm
                    nextStep={this.nextStep_}
                    prevStep={this.prevStep}
                />;
                break;
            case 3:
                Component = <VehicleOwnerInfoForm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleCheckedChange={this.handleCheckedChange}
                    handleChange={this.handleChange}
                />;
                break;
            case 4:
                Component = <Checkout
                    onSubmit={this.handleSubmit}
                    prevStep={this.prevStep}
                    data={this.state}
                />;
                break;
            default:
                Component = <div>{''}</div>;
                break;
        }
        return (
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', marginTop: '20px'}}>
                <div style={{flex: 1}} ></div>
                <div style={{flex: 1}}>
                    {this.state.success > -1 && <Message content={this.state.message}
                        error={this.state.success === 0}
                        success={this.state.success === 1} />}
                    <Form onSubmit={this.handleSubmit}>
                        <Card fluid>
                            {
                                Component
                            }
                        </Card>
                    </Form>
                </div>
                <div style={{flex:1}} ></div>
            </div>
        )
    }

    componentDidMount(){
        axios.get('https://car-listing-api.herokuapp.com/car_makes')
            .then(response => {
                let makes = response.data
                let newMakes = makes.map(make=>{
                    return {key:make.id, text: make.make, value: make.id}
                })

                this.setState({
                    makes:newMakes
                })
            })
            .catch(error => {

            })
    }
}

export default PostVehicleMainForm