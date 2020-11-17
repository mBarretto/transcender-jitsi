/* global JitsiMeetJS config*/
import React, { useEffect, useState } from 'react';
import { atualisaCampo } from './redux/CelebracaoActions';
import { Language, Input, Button, File, Data, IcoSpinner, ActionForm, IcoImagem, RadioButton  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import './celebracao.css';
import { history } from '../../utils/helpers';
import logoTranscender from '../../assets/LOGO_limpo.png';

const familiaridade = [ { id: 'A', name: 'Amigo' }, { id:'F', name: 'Familiar' } ]
const salaDefault = {
  nomeHomenageado: 'Aretha Franklin',
  dataNascimento: 1942 ,
  dataFalecimento: 2018,
  epitafio: 'Queen of soul',
  foto: {}
}

export default () => {
  const dispath = useDispatch()
  const textDefault = require(`${Language()}`)
  const [ salaState, setSalaState ] = useState({})

  useEffect(()=>{
    setSalaState(salaDefault)
  },[salaDefault])

  const videoConferenciaState = useSelector(state => state.celebracaoState.videoConferencia)
  
  const criarSala = () =>{
    console.log(videoConferenciaState);
    const valor = videoConferenciaState.nomeHomenageado.toLowerCase().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '')
    dispath(atualisaCampo({target:{name: 'sala', value: valor}}))



    history.push(`/sala/${valor}`)
  }
  const voltar = () =>{
    history.push(`/celebracao`)
  }

  return (
    <div className="box-celebracao">
      <div className='form-sala'>
        <div className='logo-transcender'>
          <img src={logoTranscender} title={textDefault.title} />
        </div>
        <h3>{textDefault.tituloCriar}</h3>
        <Input 
          label="Nome (seu)"  
          name='nome' 
          action={e => dispath(atualisaCampo(e))}
          value={videoConferenciaState.nome} 
        />
        <RadioButton
          label=''
          name='familiaridade'
          action={e => dispath(atualisaCampo(e))}
          checked={videoConferenciaState.familiaridade}
          options={familiaridade}
        />
        <Input 
          label="Nome homenageado"  
          name='nomeHomenageado' 
          action={e => dispath(atualisaCampo(e))}
          value={videoConferenciaState.nomeHomenageado} 
        />
        <Input 
          type='number'
          label="Ano de nascimento"  
          name='dataNascimento' 
          action={e => dispath(atualisaCampo(e))}
          value={videoConferenciaState.dataNascimento} 
        />
        <Input 
          type='number'
          label="Ano de falecimento"  
          name='dataFalecimento' 
          action={e => dispath(atualisaCampo(e))}
          value={videoConferenciaState.dataFalecimento} 
        />
        <Input 
          label="Epitáfio"  
          name='epitafio' 
          action={e => dispath(atualisaCampo(e))}
          value={videoConferenciaState.epitafio} 
        />
        
        <File
          label="Foto"  
          name='foto' 
          action={e => dispath(atualisaCampo(e))} 
          value={videoConferenciaState.foto}
          actionBtn={<IcoImagem />}
        />
        <div className='btn-group'>
          <Button color='secondary' size='blockd' action={()=> voltar()}>{textDefault.voltar}</Button>
          <Button color='primary' size='blockd' action={()=> criarSala()}>{textDefault.criar}</Button>
        </div>
      </div>
    </div>
  );
}