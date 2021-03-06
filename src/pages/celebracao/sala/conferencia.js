/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import $, { map } from "jquery";
import { Button, IcoCamera, IcoMicrofone, IcoSemCamera, IcoSemMicrofone, IcoTelefone } from "../../../components";
import { Assento } from "./assento"
import { AssentoMeu } from "./assentoMeu";
import { AssentoMemorial } from "./assentoMemorial";
import { history } from "../../../utils/helpers";

// Lib-jitsi-meet requires jquery as global object
window.$ = $;

export default () => { 
  const dispath = useDispatch()
  const usuarioState = useSelector(state => state.celebracaoState.usuario)
  const videoConferenciaState = useSelector(state => state.celebracaoState.videoConferencia)
  
  const [error, setError] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [members, setMembers] = useState([]);
  const [remoteTracks, setRemoteTracks] = useState([]);

  const [permissionDenied, setPermissionDenied] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoElement = useRef(null);

  const connection = useRef(null);
  const conferenceRoom = useRef(null);

  const [nomeSala, setNomeSala] = useState('arethafranklin');


  const ROOM_NAME = videoConferenciaState.sala;

  let DISPLAY_NAME = `Participante ${Math.floor(Date.now() / 1000)} | Amigo }`
    
  const usuarioLocal = JSON.parse(localStorage.getItem('usuarioConferencia'))

  if(usuarioState.nome){
    DISPLAY_NAME =  `${usuarioState.nome} | ${usuarioState.familiaridade.name }` 
  } else if(usuarioLocal && usuarioLocal.nome){
    DISPLAY_NAME =  `${usuarioLocal.nome} | ${usuarioLocal.familiaridade.name }` 
  }

  const memorialInfo = {
    nome: videoConferenciaState.nomeHomenageado, 
    data: `${videoConferenciaState.dataNascimento} - ${videoConferenciaState.dataFalecimento}`, 
    descricao: videoConferenciaState.epitafio, 
    img: videoConferenciaState.fotoUpload
  };

  useEffect(() => {
    if (!window.JitsiMeetJS) {
      setError(
        "JitsiMeetJS is not available. Please check if lib-jitsi-meet is included in index.html file"
      );
      return;
    }
    if (!window.config) {
      setError(
        "Video conference config is not available. Please check if config.js is included in index.html file"
      );
      return;
    }

    const { JitsiMeetJS, config } = initializeJitsiMeetJS();
    initializeConnection(JitsiMeetJS, config);
    return;
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function initializeJitsiMeetJS() {
    const { JitsiMeetJS, config } = window;
    let serviceUrl = 'wss://meet.jit.si/xmpp-websocket' //config.websocket || config.bosh;
    serviceUrl += `?room=${ROOM_NAME}`;
    config.serviceUrl = config.bosh = serviceUrl;
    const initOptions = {
      disableAudioLevels: true,
    };
    // Jitsi will show logs as errors
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
    JitsiMeetJS.init(initOptions);
    return { JitsiMeetJS, config };
  }
  function initializeConnection(JitsiMeetJS, config) {
    connection.current = new JitsiMeetJS.JitsiConnection(null, null, config);
    setupConnectionListeners(JitsiMeetJS);
    addMsg("Connecting to video conference server...");
    connection.current.connect();
  }
  function setupConnectionListeners(JitsiMeetJS) {
    connection.current.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      handleConnectionEstablished
    );
    connection.current.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      handleConnectionFailure
    );
    connection.current.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      handleConnectionDisconnected
    );
  }

  function handleConnectionEstablished() {
    setMsgs(["Connection successful"]);
    initConferenceRoom();
  }
  function initConferenceRoom() {
    const { JitsiMeetJS } = window;
    setupJitsiConference();
    setupConferenceHandlers(JitsiMeetJS);
    setupErrorHandlers(JitsiMeetJS);
    setMsgs([`Joining conference room ${ROOM_NAME}`]);
    conferenceRoom.current.setDisplayName(DISPLAY_NAME);
    conferenceRoom.current.join();
  }
  function setupJitsiConference() {
    const confOptions = {
      openBridgeChannel: true,
    };
    conferenceRoom.current = connection.current.initJitsiConference(
      ROOM_NAME,
      confOptions
    );
  }
  function setupConferenceHandlers(JitsiMeetJS) {
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.CONFERENCE_JOINED,
      handleConferenceJoined
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.USER_JOINED,
      handleUserJoined
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.USER_LEFT,
      handleUserLeft
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.TRACK_ADDED,
      handleTrackAdded
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.TRACK_REMOVED,
      handleTrackRemoved
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.ENDPOINT_MESSAGE_RECEIVED, 
      (_, message) => {
        menssageReceiver(_, message)
      });
  }
  
  async function handleConferenceJoined() {
    setMsgs([`Joined conference room ${ROOM_NAME}`]);
    const { JitsiMeetJS } = window;
    try {
      const tracks = await JitsiMeetJS.createLocalTracks({
        devices: ["audio", "video"],
        resolution: "vga",
      });
      setPermissionDenied(false);
      if (tracks.length === 0) return;

      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].getType() === "video")
          tracks[i].attach(videoElement.current);
        conferenceRoom.current.addTrack(tracks[i]);
      }
    } catch (err) {
      if (err.name === "gum.not_found") {
        try {
          const tracks = await JitsiMeetJS.createLocalTracks({
            devices: ["audio"],
          });
          setPermissionDenied(false);
          if (tracks.length === 0) return;
          for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].getType() === "video")
              tracks[i].attach(videoElement.current);
            conferenceRoom.current.addTrack(tracks[i]);
          }
        } catch (e) {
          console.log(e);
        }
      }
      console.log(err);
    }
  }

  function handleUserJoined(memberId) {
    // if (members[memberId]) return;
    // const displayName = conferenceRoom.current.getParticipantById(memberId)
    //   ._displayName;
    // createAndAddMember(memberId, displayName);
  }
  function handleUserLeft(memberId) {
    console.log("[TRACKS BEFORE REMOVING]", remoteTracks);
    // let tracks = remoteTracks.filter((t) => {
    //   console.log(t);
    //   return t.getParticipantId() !== memberId;
    // });
    // console.log("[TRACKS AFTER REMOVING]", tracks);
    // setRemoteTracks(tracks);

    document.getElementById(`member-${memberId}`).remove();
    // removeMember(memberId);
  }

  function handleTrackAdded(track) {
    if (track.isLocal()) return;
    setRemoteTracks((prev) => [...prev, track]);
  }
  function handleTrackRemoved(track) {
    setRemoteTracks((prev) => {
      const t = prev.filter((p) => p.getId() !== track.getId());
      return t;
    });
  }


  const sjustListMember = (i, t) =>{
    const mx = members.filter((m) => m.id === i)
    
    if (mx.length) {
      const j = members.map((m) => m.id === i ? { ...m, [t.getType()]: t } : m)
      setMembers( j )
    } else{
      const name = conferenceRoom.current.participants[i]['_displayName'] ?
      conferenceRoom.current.participants[i]['_displayName'] : `Participante - ${i}`
      setMembers( [ ...members, {id: i, name, [t.getType()]: t} ] )
    }
  }

  useEffect(() => {
    for (let i = 0; i < remoteTracks.length; i++) {
      const track = remoteTracks[i];
      const id = track.getParticipantId();

      sjustListMember(id, track)
    }
  }, [remoteTracks]);

  function setupErrorHandlers(JitsiMeetJS) {
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.CONNECTION_ERROR,
      () => {
        setMsgs([]);
        setError("Conference room connection error");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.SETUP_FAILED,
      () => {
        setMsgs([]);
        setError("Conference room set up failed");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.VIDEOBRIDGE_NOT_AVAILABLE,
      () => {
        setMsgs([]);
        setError("Conference room video bridge not available");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.RESERVATION_ERROR,
      () => {
        setMsgs([]);
        setError("Conference room reservation error");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.AUTHENTICATION_REQUIRED,
      () => {
        setError(
          "Conference room creation failed as authentication is required"
        );
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.JINGLE_FATAL_ERROR,
      (err) => {
        setMsgs([]);
        setError("Conference room creation failed due to jingle error");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.PASSWORD_REQUIRED,
      () => {
        setMsgs([]);
        setError("Conference room join failed as password was required");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.FOCUS_DISCONNECTED,
      () => {
        setMsgs([]);
        setError("Conference room focus disconnected");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.CONFERENCE_ERROR,
      () => {
        setMsgs([]);
        setError("Conference room error");
      }
    );
    conferenceRoom.current.on(
      JitsiMeetJS.events.conference.CONFERENCE_FAILED,
      () => {
        setMsgs([]);
        setError("Conference room create/join failed");
      }
    );
  }
  function handleConnectionFailure() {
    setMsgs(["Connection failure"]);
  }
  function handleConnectionDisconnected() {
    addMsg("Disconnected");
  }

  // UI interactions and updates
  function addMsg(msg) {
    setMsgs((prevMsgs) => [...prevMsgs, msg]);
  }

  function toggleAudio() {
    const tracks = conferenceRoom.current.getLocalTracks();
    tracks.forEach((track) => {
      if (track.getType() === "audio") {
        setIsAudioMuted(!track.isMuted());
        track.isMuted() ? track.unmute() : track.mute();
      }
    });
  }
  function toggleVideo() {
    const tracks = conferenceRoom.current.getLocalTracks();
    tracks.forEach((track) => {
      if (track.getType() === "video") {
        setIsVideoMuted(!track.isMuted());
        track.isMuted() ? track.unmute() : track.mute();
      }
    });
  }
  function menssageReceiver(_, message) {
    console.log(_, message, 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
  }

  const sairSala = () => {
    connection.current.disconnect();
    localStorage.removeItem('usuarioConferencia')
    history.push('/sala')
  }
  
  return (
    <div className="box-conferencia">
      <div className='sala-conferencia'>
          <AssentoMemorial member={memorialInfo} index={null} length={members.length} />

          <AssentoMeu member={{id: 111, name: DISPLAY_NAME, video: videoElement, permissionDenied, isAudioMuted, isVideoMuted}} index={0} length={members.length} />

          {members.map((member, i) => <Assento member={member} index={i+1} length={members.length} key={member.id}  />) }
      </div>
      
      <div className='controles-conferencia'>
          <div></div>
          <div>
            <Button color='secondary' type='btn circle' action={()=> toggleAudio()}>
              
              {isAudioMuted ? <IcoSemMicrofone /> : <IcoMicrofone />}
            </Button>
            <Button color='danger' type='btn circle' action={()=> sairSala()}>
              <IcoTelefone />
            </Button>
            <Button color='secondary' type='btn circle' action={()=> toggleVideo()}>
              
              {isVideoMuted ? <IcoSemCamera /> : <IcoCamera />}
            </Button>

          </div>
          <div></div>
 
       </div>
    </div>
  );
}