import { combineReducers } from 'redux'
// import alerts from './component/alert/alertsRedux'
import layoutState from './layout/redux/LayoutReducer'
import celebracaoState from './pages/celebracao/redux/CelebracaoReducer'

export const rootReducer = combineReducers({
  // alerts,
  layoutState,
  celebracaoState
})

export default rootReducer
