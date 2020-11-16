import React from 'react';

import { getWidthForSeats, getDistanceRatioForSeats, posicaoAssento } from '../../../utils';

export const AssentoMemorial = ({ member, index, length }) => {
  // let style = {}
  // let lengthAssento = 0
  // if (length <= 3) {
  //   lengthAssento = length + 2
  // } else if(length > 3){
  //   lengthAssento = 1
  // }

  // const seatSize = getWidthForSeats(lengthAssento+1);
  // const disanceRatio = getDistanceRatioForSeats(lengthAssento);
  // const angle = (360 / lengthAssento) * index;
  // const horizontal = Math.cos(angle * 2 * Math.PI / 360) * disanceRatio;
  // const vertical = Math.sin(angle * 2 * Math.PI / 360) * disanceRatio;

  // if (length <= 3) {
  //   style = { 
  //     width: seatSize, 
  //     height: seatSize, 
  //     top: `calc(50% - ${seatSize}px/2  + ${vertical}%)`, 
  //     left: `calc(50% - ${seatSize}px/2 + ${horizontal}%)`,
  //   }
  // } else if(length > 3){
  //   style = { 
  //     width: seatSize - 140, 
  //     height: seatSize - 140, 
  //     top: `calc(50% - ${seatSize - 100}px/2  + ${vertical}%)`, 
  //     left: `calc(50% - ${seatSize - 140}px/2 + ${horizontal}%)`,
  //   }
  // }

  const posicao = posicaoAssento(index, length, 'memorial')

  return ( 
    <div 
      className={'assento-memorial'}
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
