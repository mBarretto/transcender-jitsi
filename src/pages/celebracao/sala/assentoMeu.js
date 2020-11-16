import React from 'react';
import { IcoSemCamera, IcoSemMicrofone } from '../../../components';

import { getWidthForSeats, getDistanceRatioForSeats, posicaoAssento } from '../../../utils';

export const AssentoMeu = ({ member, index, length }) => {  
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


  const posicao = posicaoAssento(index, length )

  return ( 
    <div 
      className={'assento gold'} 
      id={`member-preferencial`} 
      style={posicao}
      title={`${member.name} (Eu)`}
    >
        {member.permissionDenied !== null && !member.permissionDenied ?
          <video 
            id={`video-${member.id}`}  
            height='100%' style={{ flexShrink: 0 }} 
            autoPlay='1' 
            ref={member.video} />
          : <div className='video-member'>
              <p>
                {member.name}<br />
                {member.permissionDenied  === null && (<><small>Waiting for device access permission...</small><br /></>)}
                {member.permissionDenied  && (<><small>Preview cannot be displayed as permission is denied</small><br /></>)}
              </p>
            </div>}
          <span className='info-assento'>
            {member.isAudioMuted && <IcoSemMicrofone />}
            {member.isVideoMuted && <IcoSemCamera />}
          </span>
    </div>
  );
};
