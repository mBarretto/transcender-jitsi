import axios from 'axios'
import { history } from '../../../utils/helpers'

export const CHANGE_CAMPO = 'CHANGE_CAMPO'
export const atualisaCampo = e => ({
  type: CHANGE_CAMPO,
  payload: e
})

export const LISTAR_SALAS = 'LISTAR_SALAS'
const atualisarListaSalas = e => ({
  type: LISTAR_SALAS,
  payload: e
})

export const ListarSalas = e => {
  console.log('listar sala', e);
  return dispatch => {
    axios
      .get(`http://localhost:8080/salas/listar`)
      .then(resposta => {
        console.log(resposta.data)
      })
      .catch(error => {
        console.log('error',error)
      })
  }
}

export const ATUALIZA_USUARIO = 'ATUALIZA_USUARIO'
const atualizaUsuario = e => ({
  type: ATUALIZA_USUARIO,
  payload: e
})

export const ATUALIZA_SALA = 'ATUALIZA_SALA'
const atualizaSala = e => ({
  type: ATUALIZA_SALA,
  payload: e
})

export const ATUALIZA_HOMENAGEADO = 'ATUALIZA_HOMENAGEADO'
const atualizaHomenageado = e => ({
  type: ATUALIZA_HOMENAGEADO,
  payload: e
})



export const CRIAR_SALA = 'CRIAR_SALA'
export const CriarSala = e => {
  const valor = e.nomeHomenageado.toLowerCase().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '')
  
  // return dispatch => dispatch([ atualizaSala({ ...e, sala: valor }), history.push(`/sala/${valor}`) ])
  return dispatch => {
    axios
      .post(`http://localhost:8080/salas/nova`, e)
      .then(resposta => {
        dispatch([ atualizaSala({ ...e, sala: valor }), history.push(`/sala/${valor}`) ])
      })
      .catch(error => {
        console.log('error',error)
      })
  }
}

export const ENTRAR_SALA = 'ENTRAR_SALA'
export const EntrarSala = e => {
  return dispatch => {
    axios
      .get(`http://localhost:8080/salas/entrar/${e}`)
      .then(resposta => {
        dispatch( atualizaSala( resposta.data ) )
      })
      .catch(error => {
        console.log('error entrar',error)
        history.push(`/sala`)
      })
  }

  // return dispatch => dispatch([atualizaSala(Object.assign(e, homenageado)), history.push(`/sala/${e.sala}`)])
}


export const USUARIO_SALA = 'USUARIO_SALA'
export const UsuarioSala = e => {
  return dispatch => dispatch(atualizaUsuario(e))

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