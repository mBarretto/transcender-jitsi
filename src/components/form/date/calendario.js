import React, { useEffect, useState } from 'react'
import { Button } from '../../button/button'

const dataInfo = {
    nomesDias:['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    numeroSemanas: [1, 2, 3, 4, 5],
    numeroDiasSemana: [1, 2, 3, 4, 5, 6, 7],
    nomesMeses:[
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]
}

export function Calendario({ action, value, dataInicio, dataFim }) {
  var dataAtual = new Date()
   const [dataState, setDataState] = useState(  {    
    dataFull: dataAtual,
    ano: dataAtual.getFullYear(),
    dia: dataAtual.getDate(),
    mes: dataAtual.getMonth(),
    diaSemana: dataAtual.getDay()
  })
  const [calendarioDias, setCalendarioDias] = useState(  
    <tr><td colSpan='7'>carregando</td></tr>
  )  
  const [calendarioMesAno, setcalendarioMesAno] = useState(false)

  useEffect(()=>{
    listarDias(dataState.mes, dataState.ano)
  },[])

  dataAtual.setDate(1)
  dataAtual.setDate(1 - dataAtual.getDay())

  const mudarMes = (tipo) => {
    let mesNovo = tipo === '<'? dataState.mes - 1 : tipo === '>' ? dataState.mes + 1 : tipo
    let anoNovo = dataState.ano
    if (dataState.mes === 0 &&  tipo === '<') {
      mesNovo = 11
      anoNovo = dataState.ano - 1
    } else if (dataState.mes === 11 &&  tipo === '>') {
      mesNovo = 0
      anoNovo = dataState.ano + 1
    }
    
    dataAtual.setFullYear(anoNovo, mesNovo, 1)
    dataAtual.setDate( 1 - dataAtual.getDay() )

    setDataState({ ...dataState, mes: mesNovo, ano: anoNovo, dataFull: dataAtual })
    listarDias(mesNovo, anoNovo)
  }

  const mudarAno = (tipo) => {
    let anoNovo = tipo === '<'? dataState.ano - 1 : dataState.ano + 1
        
    dataAtual.setFullYear(anoNovo, dataState.mes, 1)
    dataAtual.setDate( 1 - dataAtual.getDay() )

    setDataState({ ...dataState, ano: anoNovo, dataFull: dataAtual })
    listarDias(dataState.mes, anoNovo)
  }

  const listarDias = (mesNovo, anoNovo) =>{
    setCalendarioDias( CalendarioDias(dataState, dataAtual, action,value, dataInicio, dataFim, mesNovo, anoNovo) )
  }

  const mesesAction = (s) =>{
    setcalendarioMesAno(s)
  }

  return (
    <div className='box-calendario'>
      {calendarioMesAno? <table>
        <thead>
          <tr>
            <th>
              <Button color='default' type='btn circle' action={() => mudarAno('<')}>
                {'<'}
              </Button>
            </th>
            <th colSpan='5'>{dataState.ano}</th>
            <th>
              <Button color='default' type='btn circle' action={() => mudarAno('>')}>
                {'>'}
              </Button>
            </th>
          </tr>        
        </thead>
        <tbody>
          <tr>
            <td colSpan='7' className='btn-meses'>
              {dataInfo.nomesMeses.map((nM, i) => {
                return <Button key={i} color='secondary' type='btn' action={() => [mudarMes(i), mesesAction(false)]}>
                {nM}
              </Button>
              })}
            </td>
          </tr>
        </tbody>
      </table>
      :      
      <table>
        <thead>
          <tr>
            <th>
              <Button color='default' type='btn circle' action={() => mudarMes('<')}>
                {'<'}
              </Button>
            </th>
            <th colSpan='5'>
              <Button color='default' type='btn circle' action={() => mesesAction(true)}>
                {dataInfo.nomesMeses[dataState.mes] + ' de ' + dataState.ano}
              </Button>
            </th>
            <th>
              <Button color='default' type='btn circle' action={() => mudarMes('>')}>
                {'>'}
              </Button>
            </th>
          </tr>
          <tr>
            {dataInfo.nomesDias.map((dia, i) => {
              return <td key={`dia-semana-${dia}`}> {dia} </td>
            })}
          </tr>
        </thead>
        <tbody>{calendarioDias}</tbody>
      </table>
      }
    </div>
  )
}


export const CalendarioDias = (dataState, dataAtual,action,value, dataInicio, dataFim, mesNovo) => {
  var data = new Date()
  
  return (<>
    {dataInfo.numeroSemanas.map(s => {
      const semanaDias = () =>
      dataInfo.numeroDiasSemana.map((d) => {
          const diaAtual = dataAtual.getDate()
          const mesAtual = dataAtual.getMonth() //dataState.mes
          dataAtual.setDate(diaAtual + 1)

          return (
            <td
              key={`dia-${diaAtual}`}
              className={diaAtual === data.getDate() && mesAtual === data.getMonth()? 'dia-atual' : mesAtual === mesNovo ? 'mes-atual' : 'mes-aleatorio'}
            >
              <Button
                color={
                  dataInicio === `${diaAtual}/${mesAtual + 1}/${dataState.ano}` ||
                  dataFim === `${diaAtual}/${mesAtual + 1}/${dataState.ano}` ||
                  value === `${diaAtual}/${mesAtual + 1}/${dataState.ano}`
                    ? 'primary'
                    : 'default'
                }
                type='btn circle'
                action={() => action(`${diaAtual}/${mesAtual + 1}/${dataState.ano}`)}
              >
                {diaAtual}
              </Button>
            </td>
          )
        })

      return <tr key={`semana-${s}`}>{semanaDias()}</tr>
    })}
  </>)
}