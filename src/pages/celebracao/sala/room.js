/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import $, { map } from "jquery";
import { Button, IcoCamera, IcoMicrofone, IcoSemCamera, IcoSemMicrofone, IcoTelefone } from "../../../components";

import Jitsi from 'react-jitsi'
// import { AssentoMemorial } from "./assentoMemorial";

import './sala.css'

// Lib-jitsi-meet requires jquery as global object
window.$ = $;

export default () => { 
  const dispath = useDispatch()
  const videoConferenciaState = useSelector(state => state.celebracaoState.videoConferencia)

  const [jitsi, setJitsi] = useState({img:'', nParticipants: 0, participant:[]});
  // // const {JitsiMeetExternalAPI} = window

  // const loadJitsiScript = () => {
  //   let resolveLoadJitsiScriptPromise = null;

  //   const loadJitsiScriptPromise = new Promise((resolve) => {
  //     resolveLoadJitsiScriptPromise = resolve;
  //   });

  //   const script = document.createElement("script");
  //   script.src = "https://transcender.de/external_api.js";
  //   script.async = true;
  //   script.onload = resolveLoadJitsiScriptPromise
  //   document.body.appendChild(script);

  //   return loadJitsiScriptPromise;
  // };

  // // const initialiseJitsi = async () => {
  //   if (!window.JitsiMeetExternalAPI) {
  //     await loadJitsiScript();
  //   }

  //   const _jitsi = new window.JitsiMeetExternalAPI("transcender.de", {
  //     parentNode: document.getElementById('meet'),
  //   });

  //   setJitsi(_jitsi)
  // };

  // useEffect(() => {
  //   initialiseJitsi();

  //   return () => jitsi?.dispose?.();
  // }, []);
//  useEffect(()=>loadJitsiScript(),[])
  // console.log(jitsi);
  const {JitsiMeetExternalAPI} = window
  let api
  const connectRoom = () =>{
    var domain = "meet.jit.si";
    var options = {
        roomName: "arethafranklin",
        width: 700,
        height: 180,
        parentNode: undefined,
        configOverwrite: {},
        interfaceConfigOverwrite: {}
    }
    api = new JitsiMeetExternalAPI(domain, options);

    
    api.getCurrentDevices().then(devices => {
      console.log(devices, 'devices');
    });
    // api.getParticipantsInfo();
// setJitsi({...jitsi, nParticipants: api.getNumberOfParticipants(), participant: api.getParticipantsInfo()});

    console.log(api, 'APIAPIAIdfff', JitsiMeetExternalAPI, window, api.getParticipantsInfo());
}



const verdavi = () =>{
  // setJitsi({...jitsi, participant: api.getParticipantsInfo()});
    
    api.getAvailableDevices().then(devices => {
      console.log(devices, 'devices avaliable');
  
  });
    api.getCurrentDevices().then(devices => {
      console.log(devices, 'devices');
    });
    console.log(api, 'APIAPIAI', JitsiMeetExternalAPI, window, api.getParticipantsInfo());
  
  }


  const verdavifff = () =>{
      const part = api.getParticipantsInfo()
      console.log(part, window, window.JitsiMeetJS.app);
  
    // api.setLargeVideoParticipant(part[0].participantId);
  
  }

useEffect(()=>connectRoom(), [])

  return (
    <div className="box-conferencia">
      <div className='sala-conferencia' id='meet'>
        
          {/* <AssentoMemorial member={memorialInfo} index={0} length={members.length} /> */}

        </div>
      
      <div className='controles-conferencia'>
          <div>{jitsi.nParticipants}</div>
          <div>
            <Button color='secondary' type='btn circle' action={()=> verdavi()}>
              
              {true ? <IcoSemMicrofone /> : <IcoMicrofone />}
            </Button>
            <Button color='danger' type='btn circle' action={()=> null}>
              <IcoTelefone />
            </Button>
            <Button color='secondary' type='btn circle' action={()=> verdavifff()}>
              
              {true ? <IcoSemCamera /> : <IcoCamera />}
            </Button>

          </div>
          <div></div>
 
       </div>
    </div>
  );
}

