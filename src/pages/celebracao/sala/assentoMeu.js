import React from 'react';
import { IcoSemCamera, IcoSemMicrofone } from '../../../components';

import { posicaoAssento, familiaridadeTipo } from '../../../utils';

export const AssentoMeu = ({ member, index, length }) => {  

  const posicao = posicaoAssento(index, length )
  const memberInfo = familiaridadeTipo(member.name)

  return ( 
    <div 
      className={`assento ${memberInfo.familiaridade === 'Familiar'?'gold':''}`} 
      id={`member-preferencial`} 
      style={posicao}
      title={`${memberInfo.name} (Eu)`}
    >
      <div className='video-member'>
        {member.permissionDenied !== null && !member.permissionDenied ?
          <video 
            id={`video-${member.id}`}  
            height='100%' style={{ flexShrink: 0 }} 
            autoPlay='1' 
            ref={member.video} />
          :
          <p>
            {memberInfo.name}<br />
            {member.permissionDenied  === null && (<><small>Waiting for device access permission...</small><br /></>)}
            {member.permissionDenied  && (<><small>Preview cannot be displayed as permission is denied</small><br /></>)}
          </p>}
      </div>
      <span className='info-assento'>
        {member.isAudioMuted && <IcoSemMicrofone />}
        {member.isVideoMuted && <IcoSemCamera />}
      </span>
    </div>
  );
};
