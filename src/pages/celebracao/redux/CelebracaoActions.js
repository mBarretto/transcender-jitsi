import axios from 'axios'

export const CHANGE_CAMPO = 'CHANGE_CAMPO'
export const atualisaCampo = e => ({
  type: CHANGE_CAMPO,
  payload: e
})

export const CRIAR_SALA = 'CRIAR_SALA'
export const CriarSala = e => {
  console.log('criar sala', e);
}


export const configTentando = e => {
  console.log(e);
  return dispatch => {
    axios
      .get(`https://meet.jit.si/config.js`)
      .then(resposta => {
        console.log(resposta.data)
      })
      .catch(error => {
        console.log('error',error)
      })
  }
}