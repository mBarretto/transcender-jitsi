
import { useSelector } from 'react-redux'

export function  Language (c){
  const language = useSelector(state => state.layoutState.language)
  return `${c?c:'./'}nls/${language?language:'pt-BR'}.json`
}