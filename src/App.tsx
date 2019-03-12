import React, { Component } from 'react'
import Router from './router'
import store from './store'
import { Provider } from 'mobx-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router />
        </Provider>
      </div>
    );
  }
}

export default App
