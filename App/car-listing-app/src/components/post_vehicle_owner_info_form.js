import React from 'react'
import {Button, Card, Header, Input, Form} from "semantic-ui-react";

export const VehicleOwnerInfoForm = ({handleChange, prevStep, nextStep}) => {
    return (
        <Card.Content>
            <Header content="Owner's Information"/>
            <Form.Input label='Your Full name' required onChange={handleChange} placeholder='Full Name' type='text' name='full_name' />
            <Input onChange={handleChange} name='phone_number' required label={{ basic: true, content: '+254' }} fluid labelPosition='left' placeholder='Phone Number'/><br/>
            <Button content='Checkout' floated='right' onClick={nextStep} positive={true} />
            <Button content='Back' floated='right' onClick={prevStep} secondary />
        </Card.Content>
    )
}