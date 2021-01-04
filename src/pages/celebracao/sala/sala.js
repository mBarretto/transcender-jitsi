/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EntrarSala } from "../redux/CelebracaoActions";
import Conferencia from "./conferencia"

import './sala.css'

export default () => { 
  const dispath = useDispatch()
  const videoConferenciaState = useSelector(state => state.celebracaoState.videoConferencia)

  const paramsUrl = useParams()
  useEffect(()=>{
    if(!videoConferenciaState.sala){
      dispath( EntrarSala(paramsUrl.sala) )
    }
  },[paramsUrl, videoConferenciaState])

  
  return (
    videoConferenciaState.sala? <Conferencia /> : <></>
  );
}

