import React from 'react';
import './home.css';

import logoTranscender from '../../assets/LOGO_luz.png'
import { Button, Language } from '../../components';
import { history } from '../../utils/helpers';

export default () => {
  const textDefault = require(`${Language()}`)

  const comeceSeuCerimonial = () =>{
    history.push('/celebracao')
  }
  
  return (
    <div className='box-home'>
      <div className='home-text'>
        <h1>
          <img src={logoTranscender} title={textDefault.titulo} />
        </h1>
        <h4>{textDefault.subtitulo}</h4>
        <p>{textDefault.conteudo}</p>
        <Button color='primary' action={()=> comeceSeuCerimonial()}>{textDefault.comeceSeuCerimonial}</Button>
      </div>
    </div>
    );
}
