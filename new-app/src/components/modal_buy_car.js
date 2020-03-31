import React from 'react'
import axios from 'axios'
import { Button, Header, Icon, Modal, Form, Message } from 'semantic-ui-react'

class ModalBuyCar extends React.Component {
    state = {
        isSuccess: false,
        message: '',
        condition: '',
        full_name: '',
        cellphone: '',
        email: '',
        car_make: '',
        car_model: '',
        manufacturer_year: '',
        engine_capacity: '',
        color: ''
    }

    make_ = [{ key: 'audi', text: 'Audi', value: 'audi' },
        { key: 'ford', text: 'Ford', value: 'ford' },
        { key: 'bmw', text: 'BMW', value: 'bmw' },
        { key: 'chevrolet', text: 'Chevrolet', value: 'chevrolet' }];

    onDropDownChange = (event, {name, value}) => {
        axios.get(`https://car-listing-api.herokuapp.com/models/${value}`)
            .then(response => {
                let models = response.data.map(model => {
                    return {key:model.id, value:model.id, text:model.model}
                })
                this.setState({models, [name]:value})
            })
            .catch(error => {

            })
    }        

    onSubmit = (e) => {
        e.preventDefault()
        const data = {
            condition: this.state.condition,
            full_name: this.state.full_name,
            cellphone: this.state.cellphone,
            email: this.state.email,
            car_make: this.state.car_make,
            car_model: this.state.car_model,
            manufacturer_year: this.state.manufacturer_year,
            engine_capacity: this.state.engine_capacity,
            color: this.state.color
        }

        axios.post('http://localhost:7000/requests/car-request', data)
            .then(result => {
                if(result.data.success === 1){
                    this.setState({
                        isSuccess: true,
                        message: 'Information received'
                    })

                    this.resetForm()
                }
            }).catch(error => {
                console.log(error)
            })
    }

    resetForm(){
        this.setState({
            models:[],
            condition: '',
            full_name: '',
            cellphone: '',
            email: '',
            car_make: '',
            car_model: '',
            manufacturer_year: '',
            engine_capacity: '',
            color: ''
        })
    }

    handleCheckedChange = (e, {name, value}) => {
        this.setState({ [name]: value })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const { open, onClose, makes } = this.props
        const {handleChange, handleCheckedChange, onDropDownChange, onSubmit, make_} = this
        const {condition, isSuccess, models} = this.state
        return(
            <Modal size={'small'} open={open} onClose={onClose} closeIcon>
                <Header icon='car' content='Car Search' />
                <Modal.Content>
                {isSuccess ? <Message
                    success
                        header='Information received!'
                        content='Our sales team will contact you to discuss your budget and timeline. Thank you'/>
                        : <div></div>}
                    <div>
                        <ol>
                            <li>Describe your car search</li>
                            <li>We'll find it for you</li>
                            <li>Match you to Seller</li>
                        </ol>
                    </div>
                    <Form>
                        <Form.Input label='Full Name' value={this.state.full_name} required onChange={handleChange} placeholder='Your full name' type='text' name='full_name' />
                        <Form.Group widths='equal'>
                            <Form.Input label='Mobile' value={this.state.cellphone} required onChange={handleChange} placeholder='Your mobile number' type='text' name='cellphone' />
                            <Form.Input label='Email' value={this.state.email}  required onChange={handleChange} placeholder='Email Address' type='text' name='email' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Select name='car_make' onChange={onDropDownChange} label='Car Make' required placeholder='Car Make' fluid search selection options={makes} />
                            <Form.Select name='car_model' onChange={handleCheckedChange} label='Car Model' required placeholder='Car Model' fluid search selection options={models} />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Condition</label>
                            <Form.Radio name='condition' label='Used Kenyan' value='used_kenyan' checked={condition === 'used_kenyan'} onChange={handleCheckedChange} />
                            <Form.Radio name='condition' label='Used Foreign' value='used_foreign' checked={condition === 'used_foreign'} onChange={handleCheckedChange} />
                            <Form.Radio name='condition' label='New' value='new' checked={condition === 'new'} onChange={handleCheckedChange} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input label='Year' value={this.state.manufacturer_year} required onChange={handleChange} placeholder='Manufacturer Year' type='text' name='manufacturer_year' />
                            <Form.Input label='Engine Capacity(CC)' value={this.state.engine_capacity} required onChange={handleChange} placeholder='Engine capacity' type='text' name='engine_capacity' />
                            <Form.Input label='Color' value={this.state.color} onChange={handleChange} placeholder='Preferred COlor' type='text' name='color' />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red'  onClick={onClose}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' onClick={onSubmit}>
                        <Icon name='checkmark' /> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ModalBuyCar
