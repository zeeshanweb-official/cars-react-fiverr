import React from 'react'
import {Button, Card, Divider, Form, Header, Input} from "semantic-ui-react";
import '.././App.css'

export const VehicleInfoForm = ({nextStep, condition, transmission, handleDropDown, handleCheckedChange, handleChange, makes, models}) => {
    return (
        <Card fluid style={{display: 'flex'}}>
            <Card.Content style={{ flex: 1 }}>
                <Header content='Car/Vehicle Details'/>
                <Divider/>
                <Form.Group widths='equal'>
                    <Form.Select name='car_make' onChange={handleDropDown} label='Car Make' required placeholder='Car Make' fluid search selection options={makes} />
                    <Form.Select name='car_model' onChange={handleCheckedChange} label='Car Model' required placeholder='Car Model' fluid search selection options={models} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input label='Year' required onChange={handleChange} placeholder='Year' type='text' name='year' />
                    <Form.Input label='Mileage' required onChange={handleChange} placeholder='Mileage' type='text' name='mileage' />
                </Form.Group>
                <Form.Group inline>
                    <label>Transmission</label>
                    <Form.Radio name='transmission' label='Manual' value='Manual' checked={transmission === 'Manual'} onChange={handleCheckedChange} />
                    <Form.Radio name='transmission' label='Automatic' value='Automatic' checked={transmission === 'Automatic'} onChange={handleCheckedChange}/>
                </Form.Group>
                <Form.Group inline>
                    <label>Condition</label>
                    <Form.Radio name='condition' label='Used' value='Used' checked={condition === 'Used'} onChange={handleCheckedChange} />
                    <Form.Radio name='condition' label='New' value='New' checked={condition === 'New'} onChange={handleCheckedChange} />
                </Form.Group>
                <Form.Input label='Vin Number' onChange={handleChange} placeholder='Vehicle Identification Number' type='text' name='vin_number' />
                <Form.Input label='License Plate' onChange={handleChange} placeholder='License Plate' type='text' name='plate_number' />
            </Card.Content>

            <Card.Content>
                <Header content='Other Info'/>
                <Input name='price' onChange={handleChange} required label={{ basic: true, content: 'ksh' }} fluid labelPosition='left' placeholder='Asking Price'/>
            </Card.Content>
            <Card.Content>
                <Button type="submit" content='Next' floated='right' positive onClick={nextStep} />
            </Card.Content>
        </Card>
    )
}