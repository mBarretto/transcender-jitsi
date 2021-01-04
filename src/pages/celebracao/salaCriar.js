import React, { useEffect, useState } from 'react';
import { CriarSala } from './redux/CelebracaoActions';
import { Language, Input, Button, File, IcoImagem, RadioButton  } from '../../components';
import { useDispatch } from 'react-redux';
import './celebracao.css';
import { history } from '../../utils/helpers';
import logoTranscender from '../../assets/LOGO_limpo.png';

const familiaridade = [ { id: 'A', name: 'Amigo' }, { id:'F', name: 'Familiar' } ]
const salaDefault = {
  sala: '',
  nome: '',
  familiaridade: { id: 'A', name: 'Amigo' },

  nomeHomenageado: 'Aretha Franklin',
  dataNascimento: 1942 ,
  dataFalecimento: 2018,
  epitafio: 'Queen of soul',
  foto: {},
  fotoUpload: 'https://www.hojeemdia.com.br/polopoly_fs/1.648481.1534536791!/image/image.jpg_gen/derivatives/landscape_653/image.jpg',
}

export default () => {
  const dispath = useDispatch()
  const textDefault = require(`${Language()}`)
  const [ salaState, setSalaState ] = useState(salaDefault)

  useEffect(()=>{
    setSalaState(salaDefault)
  },[salaDefault])

  const criarSala = () => {
    dispath(CriarSala(salaState))
  }


  const voltar = () =>{
    history.push(`/cerimonial`)
  }

  const atualizaCampoState = (e) => {
    setSalaState({...salaState, [e.target.name]: e.target.value})
  }

  const encodeImageFileAsURL = (e) => {
    console.log(e)
    var file = e.target.value;
    var reader = new FileReader();
    reader.onloadend = function() {
      setSalaState({...salaState, fotoUpload: reader.result, [e.target.name]: e.target.value})
    }
    reader.readAsDataURL(file);
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
          action={e => atualizaCampoState(e)}
          value={salaState.nome} 
        />
        <RadioButton
          label=''
          name='familiaridade'
          action={e => atualizaCampoState(e)}
          checked={salaState.familiaridade}
          options={familiaridade}
        />
        <Input 
          label="Nome homenageado"  
          name='nomeHomenageado' 
          action={e => atualizaCampoState(e)}
          value={salaState.nomeHomenageado} 
        />
        <Input 
          type='number'
          label="Ano de nascimento"  
          name='dataNascimento' 
          action={e => atualizaCampoState(e)}
          value={salaState.dataNascimento} 
        />
        <Input 
          type='number'
          label="Ano de falecimento"  
          name='dataFalecimento' 
          action={e => atualizaCampoState(e)}
          value={salaState.dataFalecimento} 
        />
        <Input 
          label="Epitáfio"  
          name='epitafio' 
          action={e => atualizaCampoState(e)}
          value={salaState.epitafio} 
        />
        
        <File
          label="Foto"  
          name='foto' 
          action={e => encodeImageFileAsURL(e)}
          value={salaState.foto}
          actionBtn={<IcoImagem />}
        />
        <div className='btn-group'>
          <Button color='secondary' size='blockd' action={()=> voltar()}>{textDefault.voltar}</Button>
          <Button color='primary' size='blockd' action={()=> criarSala()} disabled={!salaState.nomeHomenageado}>{textDefault.criar}</Button>
        </div>
      </div>
    </div>
  );
}