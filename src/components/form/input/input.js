import React from 'react'

export function Input({ children, action, value, label, name, type = 'text', color = '', disabled = false, required = false }) {
  return (
    <div className={`form-box ${color} `}>
      <label htmlFor={`id-${name}`}> 
        {required && `* `}
        {label}
      </label>
      <div>
        <input 
          type={type} 
          name={name} 
          id={`id-${name}`} 
          className={required && required.erro && 'has-erro'}
          value={value} 
          onChange={action} 
          onBlur={required && required.action ? required.action : null}
          disabled={disabled} 
        />
        <div className='input-actions'>
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
        {required && required.erro && <span className='erro-mensage'>{required.erro}</span>}
        
    </div>
  )
}
