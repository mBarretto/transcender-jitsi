import React, { useEffect, useState } from 'react'
import { Button } from '../../button/button'

export function Calendario({ action, dataInicio, dataFim }) {
  var dataAtual = new Date()
  const [dataState, setData] = useState({
    dataFull: dataAtual,
    ano: dataAtual.getFullYear(),
    dia: dataAtual.getDate(),
    mes: dataAtual.getMonth(),
    diaSemana: dataAtual.getDay(),
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
    ], 
    calendarioDias: <tr><td colSpan='7'>carregando</td></tr>
  })

  useEffect(()=>{
    listarDias(dataState.mes, dataState.ano)
  },[])

  dataAtual.setDate(1)
  dataAtual.setDate(1 - dataAtual.getDay())

  const mudarMes = () => {
    const mesNovo = dataState.mes - 1
    const anoNovo = dataState.ano
    dataAtual.setDate(1)

    console.log(dataState.mes, 'FDASFLDLSAÇDFASFÇDSAFLDSAFÇDASÇF', dataState.mes - 1)
    dataAtual.setMonth(mesNovo)
    // dataAtual = new Date(dataState.ano, dataState.mes - 1, 1);
    // dataAtual.setMonth(dataState.mes - 1)
    console.log(dataAtual, dataAtual.getDay(), 'dataState.mes', mesNovo);
    dataAtual.setDate(1 - dataAtual.getDay())
    // console.log(dataAtual, dataAtual.getDay(), 'dataState.mes', 'AAAAAAAAAAAAAAAAAAAA');
    listarDias(mesNovo, anoNovo)
    setData({ ...dataState, mes: mesNovo, dataFull: dataAtual })
  }

  const listarDias = (mesNovo, anoNovo) =>{
    setData({ ...dataState, calendarioDias: CalendarioDias(dataState, dataAtual, action, dataInicio, dataFim, mesNovo, anoNovo) })
  }
console.log(dataState, 'DDDDDDDDDDDDDDDDDDDDDDDDD' );
  return (
    <div className='box-calendario'>
      <table>
        <thead>
          <tr>
            <th>
              <Button color='default' type='btn circle' action={() => mudarMes()}>
                {'<'}
              </Button>
            </th>
            <th colSpan='5'>{dataState.nomesMeses[dataState.mes] + ' de ' + dataState.ano}</th>
          </tr>
          <tr>
            {dataState.nomesDias.map((dia, i) => {
              return <td key={`dia-semana-${dia}`}> {dia} </td>
            })}
          </tr>
        </thead>
        <tbody>{dataState.calendarioDias}</tbody>
      </table>
    </div>
  )
}


const CalendarioDias = (dataState, dataAtual,action, dataInicio, dataFim, mesNovo, anoNovo) => {
  var data = new Date()
  return (<>
    {dataState.numeroSemanas.map(s => {
      const semanaDias = () =>
      dataState.numeroDiasSemana.map((d) => {
          const diaAtual = dataAtual.getDate()
          const mesAtual = dataAtual.getMonth() //dataState.mes
          dataAtual.setDate(diaAtual + 1)
          //  console.log(diaAtual, mesAtual, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA', dataAtual, dataState.mes, dataState.ano, 'SSSSSSSSSSSSSSSSSSS', s,d);
          return (
            <td
              key={`dia-${diaAtual}`}
              className={diaAtual === data.getDate() && mesAtual === mesNovo? 'dia-atual' : mesAtual === dataState.mes ? 'mes-atual' : ''}
            >
              <Button
                color={
                  dataInicio === `${diaAtual}/${mesAtual + 1}/${dataState.ano}` ||
                  dataFim === `${diaAtual}/${mesAtual + 1}/${dataState.ano}`
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