const templates = {}

templates['page/home/index.js'] = templates['page/home/index.tsx'] = `
import React, { Component } from 'react'

class Home extends Component {
  render () {
    return <div>Home</div>
  }
}
`.trim()

templates['routes/index.js'] = templates['routes/index.tsx'] = `
import Home from '~/page/home'

const routes = [{
  path: '/',
  component: Home,
  exact: true
}]

export default routes
`.trim()

templates['store/index.js'] = templates['store/index.ts'] = `
export default {
  Temp: class Temp {}
}
`.trim()

templates['index.html'] = (projectName) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`.trim()

module.exports = templates