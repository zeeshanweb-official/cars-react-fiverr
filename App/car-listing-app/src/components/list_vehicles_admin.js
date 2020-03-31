import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchVehicleRequest } from '../stateContainer/actions/vehicleActions'
import { Card, Dropdown, Button, Divider, Header, Message } from 'semantic-ui-react';
import history from '../routes/history'

class ListVehicles extends React.Component {

    state = {
        models: [],
        makes: []
    }

    onDropDownChange = (event, data) => {
        axios.get(`https://car-listing-api.herokuapp.com/models/${data.value}`)
            .then(response => {
                let models = response.data.map(model => {
                    return { key: model.id, value: model.id, text: model.model }
                })
                this.setState({ models })
            })
            .catch(error => {

            })
    }

    onModelsDropDownChange = (e, data) => {

    }

    onVehicleClick = (vehicle) =>{
        history.push({
            pathname: '/vehicles/vehicleInfo',
            state: vehicle
        })
    }

    onCreateNewClick = () => {
        history.push({
            pathname: '/vehicles/postCar'
        })
    }

    render() {
        const {vehicles} = this.props
        const { onDropDownChange, onModelsDropDownChange } = this
        const { makes, models } = this.state
        return (
            <div style={{ marginTop: '20px', width: '96%', marginLeft: '2%' }}>
                <div style={{ width:'100%', display: 'flex', flexFlow: 'wrap', justifyContent: 'flex-end' }}>
                    <div style={{ marginTop: '7px', marginLeft: 'auto' }}>
                        <Button content='Post New Car' fluid inverted color='green' onClick={this.onCreateNewClick} />
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop:'10px' }}>
                    <Card style={{ flex: 1 }}>
                        <Card.Content>
                            <Header content='Filter Search' size='medium' />
                            <Divider />
                            <Dropdown options={makes} onChange={onDropDownChange} selection fluid placeholder='By Car Make' /><br />
                            <Dropdown options={models} onChange={onModelsDropDownChange} selection fluid placeholder='By Car Model' /><br />
                        </Card.Content>
                    </Card>
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    {
                        vehicles.length > 0 ? <Card.Group itemsPerRow={1}>
                            {
                                vehicles.map(v => (
                                    <Card key={v._id} link onClick={() => this.onVehicleClick}>
                                        <img src={`https://car-listing-api.herokuapp.com/image/${v.images[0].filename}`} alt='' width={'100%'} height={200} />
                                        <Card.Content style={{ color: '#2BB355' }}><b>{`${v.full_name} - ${v.phone_number}`}</b></Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                            </Card.Description>
                                            <Card.Description>{v.car_model} - {v.car_make}</Card.Description><br />
                                            <Card.Description>{v.transmission}</Card.Description>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                <Button color='green' floated='right' content='Pay Now' />
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                ))
                            }
                        </Card.Group> :
                            <Message
                                warning
                                header='Nothing to display.'
                                content='You have not posted any vehilce. Click on Post vehicle button at bottom of side panel to post your first vehicle.'
                            />
                    }
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.props.fetchVehicles()

        axios.get('https://car-listing-api.herokuapp.com/car_makes')
            .then(response => {
                let makes = response.data
                let newMakes = makes.map(make => {
                    return { key: make.id, text: make.make, value: make.id }
                })

                this.setState({
                    makes: newMakes
                })
            })
            .catch(error => {

            })
    }
}

const mapDispatchToProps = {
    fetchVehicles: fetchVehicleRequest
}

const mapStateToProps = ({ vehicles }) => {
    return {
        vehicles: vehicles.vehicles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListVehicles)