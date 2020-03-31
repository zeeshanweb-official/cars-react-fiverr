import React, { Component } from 'react'
import {Provider} from 'react-redux'
import AppStore from './stateContainer/store'
import MainRouter from './routes'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={AppStore}>
        <MainRouter />
      </Provider>
    );
  }
}

export default App;
