import React from 'react';
import { IcoSemMicrofone } from '../../../components';

import { posicaoAssento, familiaridadeTipo } from '../../../utils';

export const Assento = ({ member, index, length }) => {
  const posicao = posicaoAssento( index, length )
  const memberInfo = familiaridadeTipo(member.name)


  return ( 
    <div 
      className={`assento ${memberInfo.familiaridade === 'Familiar'?'gold':''}`} 
      id={`member-${member.id}`} 
      style={posicao}
      title={memberInfo.name}
    >
        {member.video && !member.video.muted?
          <video 
            id={`video-${member.id}`}  
            height='100%' style={{ flexShrink: 0 }} 
            autoPlay='1' 
            ref={(ref) => ref && member.video.attach(ref)} />
          : <div className='video-member'>{memberInfo.name}</div>}
        
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
