import React, { Component } from "react"
import {connect} from 'react-redux'
import { Grid, Form, Button, Header, Card, Divider } from "semantic-ui-react";
import { registerRequest } from '../../stateContainer/actions/authActions'
import history from '../../routes/history'

class AdminSignUp extends Component {
    state = {
        phone_number: '',
        password: '',
        confirm_password: ''
    }

    onRegisterClick = () => {
        this.props.registerRequest({phone_number: this.state.phone_number, 'password': this.state.password})
    }

    onChange = ({target})=> {
        this.setState({
            [target.name]: target.value
        })
    }

    redirectToLogin = () => {
        history.push({
            pathname: '/admin/login'
        })
    }

    redirectToLogin = this.redirectToLogin.bind(this)

    render(){
        const {loading} = this.props
        return (
            <div className='container-main'>
                <div className='form-content'>
                    <Form>
                       <Card>
                           <Card.Content>
                               <Header color='green' as={'h3'} content='Create Your Account' />
                           </Card.Content>
                           <Card.Content>
                                <Form.Input onChange={this.onChange} name='phone_number' placeholder='Phone Number' label='Your Phone Number' required />
                                <Form.Input type='password' onChange={this.onChange} name='password' placeholder='Password' label='Your Password' required />
                                <Form.Input type='password' onChange={this.onChange} name='confirm_password' placeholder='Confirm Password' label='Confirm Your Password' required />
                           </Card.Content>
                           <Card.Content>
                                <Button type='submit' content='Sign Up' fluid loading={loading} onClick={this.onRegisterClick} inverted color='green' />
                           </Card.Content>
                       </Card>
                    </Form>
                    <Divider horizontal>Already Registered?</Divider>
                    <Button content='Sign In' fluid secondary onClick={this.redirectToLogin} />
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = ({register}) => ({
    user: register.user,
    loading: register.loading
})

const mapDispatchToProps = {
    registerRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUp)