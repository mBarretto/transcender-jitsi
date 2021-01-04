import React, { useEffect, useState } from 'react';
import {  UsuarioSala } from './redux/CelebracaoActions';
import { Language, Input, Button, RadioButton  } from '../../components';
import { useDispatch } from 'react-redux';
import { history } from '../../utils/helpers';
import { useParams } from 'react-router-dom';
import logoTranscender from '../../assets/LOGO_limpo.png';
import './celebracao.css';

const familiaridade = [ { id: 'A', name: 'Amigo' }, { id:'F', name: 'Familiar' } ]

export default () => {
  const dispath = useDispatch()
  const textDefault = require(`${Language()}`)

  const [stateSala, setStateSala] = useState({sala: '', nome: '', familiaridade: { id: 'A', name: 'Amigo' },})

  const paramsUrl = useParams()
  useEffect(()=>{
    if (paramsUrl.sala && !stateSala.sala) {
      setStateSala({...stateSala, sala: paramsUrl.sala})
    }
  },[paramsUrl, stateSala])
  
  const entrar = () =>{
    localStorage.setItem('usuarioConferencia', JSON.stringify(stateSala) )
    dispath( [ UsuarioSala(stateSala), history.push(`/sala/${stateSala.sala}`) ] )
  }

  const criarSala = () =>{
    history.push(`/cerimonial/criar`)
  }

  const atualisaCampoState = (e) => {
    setStateSala({...stateSala, [e.target.name]: e.target.value})
  }

  return (
    <div className="box-celebracao">
      <div className='form-sala'>
        <div className='logo-transcender'>
          <img src={logoTranscender} title={textDefault.title} />
        </div>
        <h3>{textDefault.tituloEntrar}</h3>
        <Input label="Sala" name='sala' action={e => atualisaCampoState(e)} value={stateSala.sala} />
        <Input label="Nome"  name='nome' action={e => atualisaCampoState(e)} value={stateSala.nome} />
        <RadioButton
          label=''
          name='familiaridade'
          action={e => atualisaCampoState(e)}
          checked={stateSala.familiaridade}
          options={familiaridade}
        />
        <div className='btn-group'>
          <Button color='secondary' size='blockd' action={()=> criarSala()}>{textDefault.criarSala}</Button>
          <Button color='primary' size='blockd' action={()=> entrar()} disabled={!stateSala.sala}>{textDefault.entrar}</Button>
        </div>
      </div>
    </div>
  );
}
