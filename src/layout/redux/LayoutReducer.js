import { SIDEBAR_LEFT, SIDEBAR_RIGHT, MODAL_OPEN } from './LayoutActions'

const initialState = {
  sidebarRight: false,
  sidebarLeft: false,
  modalOpen: '',
  language: 'pt-BR'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIDEBAR_LEFT:
      return { ...state, sidebarLeft: payload }
    case SIDEBAR_RIGHT:
      return { ...state, sidebarRight: payload }
    case MODAL_OPEN:
      return { ...state, modalOpen: payload }
    default:
      return state
  }
}
