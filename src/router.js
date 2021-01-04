import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './utils/helpers'

import Celebracao from './pages/celebracao/celebracao'
import Home from './pages/home/home'

import Sala from './pages/celebracao/celebracao'
import SalaConferencia from './pages/celebracao/sala/sala'
import SalaCriar from './pages/celebracao/salaCriar'
import SalaEntrar from './pages/celebracao/salaEntrar'

import Room from './pages/celebracao/sala/room'

export default () => (
  <Router history={history}>
    <Switch>
      <Route path='/' exact={true} component={Home} />
      <Route path='/home' exact={true} component={Home} />

      <Route path='/cerimonial' exact component={SalaEntrar} />
      <Route path='/cerimonial/criar' exact component={SalaCriar} />
      <Route path='/cerimonial/sala/:sala' exact component={SalaEntrar} />
      <Route path='/sala/:sala' exact component={SalaConferencia} />

      <Route path='/sala' exact component={Sala} />
      <Route path='/room' exact component={Room} />
      {/* <Redirect from='*' to='/Home' /> */}
    </Switch>
  </Router>
)
