import React from 'react'
import axios from 'axios'
import '../App.css';
// import logo from '../logo.svg';
import { Grid, Form, Button, Card, Input, Divider, Header } from 'semantic-ui-react';

class PostVehicle extends React.Component {
    state = {
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
    }

    make_ = [{ key: 'audi', text: 'Audi', value: 'audi' }, 
    { key: 'ford', text: 'Ford', value: 'ford' }, 
    { key: 'bmw', text: 'BMW', value: 'bmw' }, 
    { key: 'chevrolet', text: 'Chevrolet', value: 'chevrolet' }]

    handleCheckedChange = (e, {name, value}) => {
        console.log(value)
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const formData = this.formatFormData(this.state)

        // axios.post('http://localhost:7000/vehicles', formData)
        //     .then(result => {
        //         console.log(result)
        //     }).catch(error => {
        //         console.log(error)
        //     })
        console.log(formData)
    }

    handleFile = (e) => {
        this.setState({
            [e.target.name]: e.target.files
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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

    render() {
        const { condition, transmission } = this.state
        return (
            <Grid columns={3}>
                <Grid.Column width={5}/>
                <Grid.Column width={6}>
                    <Form onSubmit={this.onSubmit}>
                        <Card fluid>
                            <Card.Content>
                                <Header content='Car/Vehicle Details'/>
                                <Divider/>
                                <Form.Group widths='equal'>
                                    <Form.Select name='car_make' onChange={this.handleCheckedChange} label='Car Make' required placeholder='Car Make' fluid search selection options={this.make_} />
                                    <Form.Select name='car_model' onChange={this.handleCheckedChange} label='Car Model' required placeholder='Car Model' fluid search selection options={this.make_} />
                                    <Form.Select name='car_type' onChange={this.handleCheckedChange} label='Car Type' required placeholder='Car Type' fluid search selection options={this.make_} />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input label='Year' required onChange={this.handleChange} placeholder='Year' type='text' name='year' />
                                    <Form.Input label='Mileage' required onChange={this.handleChange} placeholder='Mileage' type='text' name='mileage' />
                                </Form.Group>
                                <Form.Group inline>
                                    <label>Transmission</label>
                                    <Form.Radio name='transmission' label='Manual' value='manual' checked={transmission === 'manual'} onChange={this.handleCheckedChange} />
                                    <Form.Radio name='transmission' label='Automatic' value='automatic' checked={transmission === 'automatic'} onChange={this.handleCheckedChange}/>
                                </Form.Group>
                                <Form.Group inline>
                                    <label>Condition</label>
                                    <Form.Radio name='condition' label='Used' value='used' checked={condition === 'used'} onChange={this.handleCheckedChange} />
                                    <Form.Radio name='condition' label='New' value='new' checked={condition === 'new'} onChange={this.handleCheckedChange} />
                                </Form.Group>
                                <Form.Input label='VIN number' required onChange={this.handleChange} placeholder='Vehicle Identification Number' type='text' name='vin_number' />
                                <Form.Input label='License Plate Number' required onChange={this.handleChange} placeholder='License Plate' type='text' name='plate_number' />
                            </Card.Content>

                            <Card.Content>
                                <Header content='Other Info'/>
                                <Input name='price' onChange={this.handleChange} required label={{ basic: true, content: 'ksh' }} fluid labelPosition='left' placeholder='Asking Price'/>
                            </Card.Content>

                            <Card.Content>
                                <Header content='Your Location'/>
                                <Form.Group widths='equal'>
                                    <Form.Select name='county' onChange={this.handleCheckedChange} label='County' required placeholder='Your County' fluid search selection options={this.make_} />
                                    <Form.Input label='Town/Area' required onChange={this.handleChange} placeholder='Area/Town' type='text' name='town' />
                                </Form.Group>
                            </Card.Content>
                            <Card.Content>
                                <Header content='Some Images'/>
                                <Form.Input onChange={this.handleFile} type="file" name="files" multiple />
                            </Card.Content>
                            <Card.Content>
                                <Header content="Owner's Information"/>
                                <Form.Input label='Your Full name' required onChange={this.handleChange} placeholder='Full Name' type='text' name='full_name' />
                                <Input onChange={this.handleChange} name='phone_number' required label={{ basic: true, content: '+254' }} fluid labelPosition='left' placeholder='Phone Number'/><br/>
                                <Button type="submit" content='Submit' fluid primary />
                            </Card.Content>
                        </Card>
                    </Form>
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>
            </Grid>
        )
    }
}

export default PostVehicle