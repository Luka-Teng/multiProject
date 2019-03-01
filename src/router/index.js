import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import {
  HashRouter,
  Switch
} from 'react-router-dom'
import routes from '@/routes'

export default class Router extends Component {
  render () {
    return (
      <HashRouter>
        <div id='body'>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>
      </HashRouter>
    )
  }
}
