/* global JitsiMeetJS config*/
import React from 'react';
import { Language, Button  } from '../../components';
import './celebracao.css';
import { history } from '../../utils/helpers';

export default () => {
  const textDefault = require(`${Language()}`)

  return (
    <div className="box-celebracao">
      <div className='form-sala'>
        <h3>{textDefault.titulo}</h3>
          <Button color='primary' action={()=> history.push(`/celebracao/criar`)}>
            Criar sala
          </Button>
          <Button color='primary' action={()=> history.push(`/celebracao/sala/arethafranklin`)}>
            entrar sala Aretha Franklin
          </Button>
      </div>
    </div>
  );
}
