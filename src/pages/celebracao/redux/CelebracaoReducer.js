import { CHANGE_CAMPO } from './CelebracaoActions'

const initialState = {
  videoConferencia: {
    // sala: 'aretha-franklin',
    // nome: 'Davi R M',
    // dominio:  'transcender.de:4444',
    
    
    dominio:  'meet.jit.si',
    sala: '',

    nome: '',
    familiaridade: { id: 'A', name: 'Amigo' },
    
    nomeHomenageado: 'Aretha Franklin',
    dataNascimento: 1942 ,
    dataFalecimento: 2018,
    epitafio: 'Queen of soul',
    foto: {}
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_CAMPO:
      return { ...state, videoConferencia: { ...state.videoConferencia, [payload.target.name]: payload.target.value} }
    default:
      return state
  }
}
