/* global JitsiMeetJS config*/
import React, { useEffect } from 'react';
import { atualisaCampo } from './redux/CelebracaoActions';
import { Language, Input, Button, RadioButton  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import './celebracao.css';
import { history } from '../../utils/helpers';
import { useParams } from 'react-router-dom';

const familiaridade = [ { id: 'A', name: 'Amigo' }, { id:'F', name: 'Familiar' } ]

export default () => {
  const dispath = useDispatch()
  const textDefault = require(`${Language()}`)

  const videoConferenciaState = useSelector(state => state.celebracaoState.videoConferencia)

  const paramsUrl = useParams()
  useEffect(()=>{
    if (paramsUrl.sala) {
      const target = {target:{name: 'sala', value: paramsUrl.sala}}
      dispath(atualisaCampo(target))
    }
  },[paramsUrl])
  
  const entrar = () =>{
    history.push(`/sala/${videoConferenciaState.sala}`)
  }

  const criarSala = () =>{
    history.push(`/celebracao/criar`)
  }

  return (
    <div className="box-celebracao">
      <div className='form-sala'>
        <h3>{textDefault.tituloEntrar}</h3>
        <Input label="Sala" name='sala' action={e => dispath(atualisaCampo(e))} value={videoConferenciaState.sala} />
        <Input label="Nome"  name='nome' action={e => dispath(atualisaCampo(e))} value={videoConferenciaState.nome} />
        <RadioButton
          label=''
          name='familiaridade'
          action={e => dispath(atualisaCampo(e))}
          checked={videoConferenciaState.familiaridade}
          options={familiaridade}
        />
        <div className='btn-group'>
          <Button color='secondary' size='blockd' action={()=> criarSala()}>{textDefault.criarSala}</Button>
          <Button color='primary' size='blockd' action={()=> entrar()}>{textDefault.entrar}</Button>
        </div>
      </div>
    </div>
  );
}
