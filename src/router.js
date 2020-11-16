import React, { useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { history } from './utils/helpers'

// import AuthLayout from './pages/celebracao/celebracao'
import Celebracao from './pages/celebracao/celebracao'
import Home from './pages/home/home'

import Sala from './pages/celebracao/celebracao'
import SalaConferencia from './pages/celebracao/sala/sala'
import SalaCriar from './pages/celebracao/salaCriar'
import SalaEntrar from './pages/celebracao/salaEntrar'

// const PrivateRoute = ({ component: Component }) => {
//   const dispatch = useDispatch()
//   const autenticado = useSelector(state => state.usuarioState)
//   // useEffect(() => dispatch(loged()), [dispatch])

//   return (
//     <Route
//       exact
//       render={props =>
//         true ? (
//           <AuthLayout>
//             <Component {...props} />
//           </AuthLayout>
//         ) : (
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         )
//       }
//     />
//   )
// }

export default () => (
  <Router history={history}>
    <Switch>
      <Route path='/' exact={true} component={Celebracao} />
      <Route path='/home' exact={true} component={Home} />
      {/* <Route path='/login' exact={true} component={login} /> */}
      {/* <Route path='/registrar' exact={true} component={registrar} /> */}

      {/* <PrivateRoute path='/' exact component={Celebracao} /> */}
      <Route path='/celebracao' exact component={SalaEntrar} />
      <Route path='/celebracao/criar' exact component={SalaCriar} />
      <Route path='/celebracao/sala/:sala' exact component={SalaEntrar} />
      <Route path='/sala/:sala' exact component={SalaConferencia} />

      <Route path='/sala' exact component={Sala} />
      {/* <Redirect from='*' to='/login' /> */}
    </Switch>
  </Router>
)
