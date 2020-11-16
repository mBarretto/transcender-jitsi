import React from 'react';
import { IcoSemMicrofone } from '../../../components';

import { getWidthForSeats, getDistanceRatioForSeats, posicaoAssento } from '../../../utils';

export const Assento = ({ member, index, length }) => {
  // let style = {}
  // let lengthAssento = 0
  // if (length <= 3) {
  //   lengthAssento = length + 2
  // } else if(length > 3 && length <= 10){
  //   lengthAssento = length + 1
  // }

  // const seatSize = getWidthForSeats(lengthAssento);
  // const disanceRatio = getDistanceRatioForSeats(lengthAssento);
  // const angle = (360 / lengthAssento) * index;
  // const horizontal = Math.cos(angle * 2 * Math.PI / 360) * disanceRatio;
  // const vertical = Math.sin(angle * 2 * Math.PI / 360) * disanceRatio;

 
  const posicao = posicaoAssento( index, length )


  return ( 
    <div 
      className={'assento'} 
      id={`member-${member.id}`} 
      style={posicao}
      title={member.name}
    >
        {member.video && !member.video.muted?
          <video 
            id={`video-${member.id}`}  
            height='100%' style={{ flexShrink: 0 }} 
            autoPlay='1' 
            ref={(ref) => ref && member.video.attach(ref)} />
          : <div className='video-member'>{member.name}</div>}
        
        {member.audio && !member.audio.muted?
          <audio 
            id={`audio-${member.id}`} 
            autoPlay='1' 
            ref={(ref) => ref && member.audio.attach(ref)} />
        :null}
        <span className='info-assento'>
          {(member.audio && member.audio.muted) && <IcoSemMicrofone title={`${member.name} - mutado`} />}
        </span>
    </div>
  );
};
