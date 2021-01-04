/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import $, { map } from "jquery";
import { Button, IcoCamera, IcoMicrofone, IcoSemCamera, IcoSemMicrofone, IcoTelefone } from "../../../components";
// import { AssentoMemorial } from "./assentoMemorial";

import './sala.css'

// Lib-jitsi-meet requires jquery as global object
window.$ = $;

export default () => { 
  const dispath = useDispatch()
  const videoConferenciaState = useSelector(state => state.celebracaoState.videoConferencia)
  
  // const jitsiMeet = require('./connect.js')

  // useEffect(()=>{
  //   require('./connect.js')
  // }, [])
  const { JitsiMeetJS, config } = window;
  let connection = null

  const innitConnect = () =>{
    JitsiMeetJS.init();

    connection = new JitsiMeetJS.JitsiConnection(null, null, config);
    
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
    
    connection.connect();
  } 
  const onConnectionSuccess = () => {
    const confOptions = {
      openBridgeChannel: true,
    };
    const room = connection.initJitsiConference("conference1", confOptions);
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
    
    console.log(connection, JitsiMeetJS, window);
    JitsiMeetJS.createLocalTracks().then(onLocalTracks);
    room.join();
    
  }
  const onConnectionFailed = () => {
    
  }
  const disconnect = () => {
    
  }
  const onRemoteTrack = (e) => {
    
  }
  const onConferenceJoined = () => {
    
  }
  const onLocalTracks = () => {
    
  }
  
  const sairSala = () => {
    
  }
  const toggleAudio = () => {
    
  }
  const toggleVideo = () => {
    
  }
  console.log('jitsiMeet');
  
  
  innitConnect()
  
  return (
    <div className="box-conferencia">
      <div className='sala-conferencia'>
          {/* <AssentoMemorial member={memorialInfo} index={0} length={members.length} /> */}
        </div>
      
      <div className='controles-conferencia'>
          <div></div>
          <div>
            <Button color='secondary' type='btn circle' action={()=> toggleAudio()}>
              
              {true ? <IcoSemMicrofone /> : <IcoMicrofone />}
            </Button>
            <Button color='danger' type='btn circle' action={()=> sairSala()}>
              <IcoTelefone />
            </Button>
            <Button color='secondary' type='btn circle' action={()=> toggleVideo()}>
              
              {true ? <IcoSemCamera /> : <IcoCamera />}
            </Button>

          </div>
          <div></div>
 
       </div>
    </div>
  );
}

