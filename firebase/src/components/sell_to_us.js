import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import ModalBuy from '../components/modal_buy_car'
import { fetchVehicleGuestRequest } from '../stateContainer/actions/vehicleActions'
import { Card, Dropdown, Divider, Header, Message, Button } from 'semantic-ui-react';
import history from '../routes/history'
import "react-image-gallery/styles/css/image-gallery.css";

class SellToUs extends React.Component {

    state = {
        open: false,
        models: [],
        makes: []
    }

    onDropDownChange = (event, data) => {
        axios.get(`https://car-listing-api.herokuapp.com/models/${data.value}`)
            .then(response => {
                let models = response.data.map(model => {
                    return {key:model.id, value:model.id, text:model.model}
                })
                this.setState({models})
            })
            .catch(error => {

            })
    }

    onModelsDropDownChange = (e, data) => {

    }

    onBuyClick = (e) => {
        e.preventDefault()
        this.setState({
            open: true
        })
    }

    onSellClick = (e) => {
        e.preventDefault()
        history.push({
            pathname: '/admin/sellMyCar'
        })
    }

    onBuyClick = this.onBuyClick.bind(this)
    onSellClick = this.onSellClick.bind(this)

    onVehicleClick = (vehicle) => {
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

    onModalClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { vehicles } = this.props
        const { onSellClick, onBuyClick, onModelsDropDownChange, onDropDownChange } = this
        const { open, makes, models } = this.state

        let today = moment().format('dddd')
        return (
            <div style={{ marginTop: '20px', width: '96%', marginLeft: '2%' }}>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <Card style={{ flex: 1 }}>
                        <Card.Content>
                            <Header content='Filter Search' size='medium' />
                            <Divider />
                            <Dropdown options={makes} onChange={onDropDownChange} selection fluid placeholder='By Car Make' /><br />
                            <Dropdown options={models} onChange={onModelsDropDownChange} selection fluid placeholder='By Car Model' /><br />
                        </Card.Content>
                    </Card>
                </div>
                {
                    vehicles.length > 0 && <div style={{ paddingTop: '16px', paddingBottom:'16px' }}>
                        Currently Available Vehicle Requests. Do you have any Car meeting the specifications?
                    </div>
                }
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    {
                        vehicles.length > 0 ? <Card.Group itemsPerRow={1}>
                            {
                                vehicles.map(v => {
                                    let phoneNumber = today === 'Monday' ? ` - ${v.phone_number}` : ''
                                    return (<Card key={v._id} link onClick={() => this.onVehicleClick(v)}>
                                        <img src={`https://car-listing-api.herokuapp.com/image/${v.images[0].filename}`} alt='' width={'100%'} height={200} />
                                        <Card.Content style={{ color: '#2BB355' }}><b>{`${v.full_name} ${phoneNumber}`}</b></Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                            </Card.Description>
                                            <Card.Description>{v.car_model} - {v.car_make}</Card.Description><br />
                                            <Card.Description>{v.transmission}</Card.Description>
                                        </Card.Content>
                                    </Card>)
                                })
                            }
                        </Card.Group> :
                            <div style={{ flex: 1, width: '100%' }}>
                                <Message
                                    warning
                                    header='Nothing to display!'
                                    content='Currently no vehicle is listed.'
                                />
                            </div>
                    }
                </div>
                <ModalBuy open={open} onClose={this.onModalClose} />
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchVehicles()

        //makes
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

const mapDispatchToProps = {
    fetchVehicles: fetchVehicleGuestRequest
}

const mapStateToProps = ({ vehicles }) => {
    return {
        vehicles: vehicles.vehicles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellToUs)