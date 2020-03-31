import React from 'react'
import { Button } from 'semantic-ui-react'
import history from '../routes/history'

class MainPage extends React.Component {

    logout = () => {
        localStorage.removeItem('auth')
        history.push({
            pathname: '/admin/login'
        })
    }

    onCreateNewClick = () => {
        history.push({
            pathname: '/admin/vehicles/'
        })
    }

    onSellToUsClick = () => {
        history.push({
            pathname: '/admin/sellToUs/'
        })
    }

    render() {
        return (
            <div style={{ marginTop: '20px', width: '96%', marginLeft: '2%' }}>
                <div style={{ flex: 1, display: 'flex', flexFlow: 'wrap', justifyContent: 'center', padding:'30px', marginLeft:'30px', marginRight:'30px'}}>
                    <Button fluid size='large' content='My Ads' color='green' onClick={this.onCreateNewClick} />
                </div>
                <div>
                    <ol>
                        <li style={{margin: '20px'}}>Post your car</li>
                        <li style={{ margin: '20px' }}>Meet customers at the bazaar</li>
                        <li style={{ margin: '20px' }}>Sell</li>
                    </ol>
                </div>
                <div style={{ flex: 1, display: 'flex', flexFlow: 'wrap', justifyContent: 'center', padding:'30px', marginLeft:'30px', marginRight:'30px' }}>
                    <Button fluid size='large' content='Sell to Us' onClick={this.onSellToUsClick} color='green' />
                </div>
                <div>
                    <ol>
                        <li style={{margin: '20px'}}>Match our requirements</li>
                        <li style={{ margin: '20px' }}>Give us the best offer</li>
                        <li style={{ margin: '20px' }}>Sell</li>
                    </ol>
                </div>
                <div style={{ flex: 1, display: 'flex', flexFlow: 'wrap', justifyContent: 'center', padding:'30px', marginLeft:'30px', marginRight:'30px' }}>
                    <Button fluid size='large' content='Logout' color='red' onClick={this.logout} />
                </div>
            </div>
        )
    }
}

export default MainPage