import { CHANGE_CAMPO, ATUALIZA_SALA, ATUALIZA_USUARIO, ATUALIZA_HOMENAGEADO } from './CelebracaoActions'

const initialState = {
  usuario: {
    nome: '',
    familiaridade: { id: 'A', name: 'Amigo' },
  },
  videoConferencia: {
    dominio:  'meet.jit.si',
    sala: '',

    nome: '',
    familiaridade: { id: 'A', name: 'Amigo' },
    
    nomeHomenageado: '',
    dataNascimento: 0 ,
    dataFalecimento: 0,
    epitafio: '',
    foto: {}
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_CAMPO:
      return { ...state, videoConferencia: { ...state.videoConferencia, [payload.target.name]: payload.target.value} }
    case ATUALIZA_SALA:
      return {...state, videoConferencia: payload }
    case ATUALIZA_USUARIO:
      return {...state, usuario: payload }
    case ATUALIZA_HOMENAGEADO:
      return {...state, homenageado: payload }
    default:
      return state
  }
}
