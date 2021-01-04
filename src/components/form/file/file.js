import React, { useState } from 'react'
import { IcoArquivoAdd } from '../../icon/icon'
import { ActionForm } from '../actions/actions'

export function File({ children, action, value = '', label, name, type = 'file', color = '', disabled = false, actionBtn = <IcoArquivoAdd /> }) {
  const [msg, setMsg] = useState('')
  const changeFile = (e) =>{

    if (e) {
      if (e.size < 200000) {
        action({target: {name: name, value: e}})
        setMsg('')
      } else{
        setMsg('Tamanho maior que o permitido')
      }
    } else{
      setMsg('')
    }
    
console.log(e, 'fdljfldkjaflkdjsalfkj', e);
  }
  return (
    <div className={`form-box ${color} input-file`}>
      <label htmlFor={`id-${name}`}>{label}</label>
      <div>
        <div className='input-file-custom'>
          <input type='text' name={name} id={`id-${name}-text`} value={value.name?value.name:''} onChange={action} disabled={true} />
          <input type={type} name={name} id={`id-${name}`} files={value} onChange={(e) => changeFile(e.target.files[0])} disabled={disabled} />
        </div>
        <div className='input-actions'>
          <ActionForm action={e => null} title={'Selecione'}>
            <input 
              type={type} 
              name={name} 
              id={`id-${name}-action`} 
              files={value} 
              onChange={(e) => changeFile(e.target.files[0])} 
              disabled={disabled}
              accept="image/jpg, image/png"
            />
            {actionBtn}
          </ActionForm>
          {children && children.length
            ? children.map(e => {
                return e && e.type && e.type.name === 'ActionForm' ? e : null
              })
            : children && children.type && children.type.name === 'ActionForm'
            ? children
            : null}
        </div>
      </div>
      {children && children.length
        ? children.map(e => {
            return e && e.type && e.type.name !== 'ActionForm' ? e : null
          })
        : children && children.type && children.type.name !== 'ActionForm'
        ? children
        : null}
        {msg}
    </div>
  )
}
