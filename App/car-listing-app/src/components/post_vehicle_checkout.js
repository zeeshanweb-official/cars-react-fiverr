import React from 'react'
import { Grid, Card, Dropdown, Button, Divider, Header, Message } from 'semantic-ui-react';
export const Checkout = ({ data, prevStep, onSubmit}) => {
    console.log(data)
    return (
    <Card.Content>
        <Header content='Confirm Details' />
        <Divider />

        <img src={URL.createObjectURL(data.files[0])} alt='' width={'100%'} height={200} />
        <Card.Content style={{ color: '#2BB355' }}><b>{`${data.full_name} ${data.phone_number}`}</b></Card.Content>
        <Card.Content>
            <Card.Description>
            </Card.Description>
            <Card.Description>{data.car_model} - {data.car_make}</Card.Description><br />
            <Card.Description>{`Transmission: ${data.transmission}`}</Card.Description>
            <Card.Description>{`Condition: ${data.condition}`}</Card.Description>
            <Card.Description>{`Asking Price: KES ${data.price}`}</Card.Description>
        </Card.Content>

            <Divider/>
            <Button type='submit' content='Pay Now' floated='right' onClick={onSubmit} positive={true} />
            <Button content='Back' floated='right' onClick={prevStep} secondary />
    </Card.Content>
    )
}