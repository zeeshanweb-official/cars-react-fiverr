import React, { Component } from "react"
import { connect } from 'react-redux'
import { Grid, Form, Button, Divider } from "semantic-ui-react"
import { loginRequest, loginRedirect } from '../../stateContainer/actions/authActions'
import history from '../../routes/history'

class AdminLogin extends Component {
    state = { phone_number: '', password: '' }
    onLoginClick = () => {
        this.props.loginRequest(this.state)
    }

    onChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    redirectToSignUp = () => {
        history.push({
            pathname: '/admin/signup'
        })
    }

    redirectToSignUp = this.redirectToSignUp.bind(this)

    render() {
        const { loading } = this.props
        return (
            <div className='container-main'>
                <div className='form-content'>
                    <Form className='form-flex'>
                        <Form.Input type="email" className='form-input' onChange={this.onChange} name='email' placeholder='your@email.com' label='Your Email' required />
                        <Form.Input className='form-input' type='password' onChange={this.onChange} name='password' placeholder='Password' label='Your Password' required />
                        <Button className='form-input' disabled={loading}
                            type='submit'
                            content='Sign In'
                            fluid loading={loading}
                            onClick={this.onLoginClick}
                            inverted color='green' />
                    </Form>
                    <Divider horizontal>Don't have an Account</Divider>
                    <Button content='Register' fluid secondary onClick={this.redirectToSignUp} />
                </div>
            </div>
        )
    }

    componentWillMount() {
        if (localStorage.getItem('auth')) {
            history.push({
                pathname: '/admin/sellMyCar'
            })
        }
    }
}

const mapStateToProps = ({ login }) => ({
    user: login.user,
    loading: login.loading
})

const mapDispatchToProps = {
    loginRequest, loginRedirect

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)