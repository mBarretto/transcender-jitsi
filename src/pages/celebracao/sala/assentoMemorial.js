import React from 'react';

import { posicaoAssento } from '../../../utils';

export const AssentoMemorial = ({ member, index, length }) => {

  const posicao = posicaoAssento(index, length, 'memorial')

  return ( 
    <div 
      className={'assento-memorial'}
      id={'assento-memorial'}
      style={posicao}
      title={member.nome}
    >
      <span><h2>{member.nome}</h2></span>
    
      <div className='img-memorial'>
        <img style={{height: `100%`}} src={member.img} />
      </div>
      <span><p>{member.data}</p></span>
      <span><p>{member.descricao}</p></span>
    </div>
  );
};
