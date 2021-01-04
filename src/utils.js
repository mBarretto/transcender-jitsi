export const getWidthForSeats = seats => {
  const fullWIdth = Math.min(window.innerHeight - 45, window.innerWidth);
  switch (seats) {
    case 0: return 0;
    case 1: return fullWIdth;
    case 2: return fullWIdth / 2;
    case 3: return fullWIdth / (1 + 2 / Math.sqrt(3));
    case 4: return fullWIdth / (1 + Math.sqrt(2));
    case 5: return fullWIdth / (1 + Math.sqrt(2 * (1 + 1 / Math.sqrt(5))));
    case 6: return fullWIdth / 3;
    case 7: return fullWIdth / 4;
    default: return fullWIdth / 4;
  }
};
export const getDistanceRatioForSeats = seats => {
  if (seats < 2)
    return 0;
  const width = getWidthForSeats(seats);
  const fullWIdth = Math.min(window.innerHeight - 45, window.innerWidth);
  return 50 - width / 2 / fullWIdth * 100;
};



export const posicaoAssento = (index, length, assento) => {
  let lengthAssento = length + 4

  if (length >= 2 ){ //length <= 10) {
    lengthAssento = length + 1
  }

  let seatSize = getWidthForSeats(lengthAssento);

  let lengthMemorial = lengthAssento
  if (length >= 4 && length <= 6) {
    lengthMemorial = 3
  } else if (length >= 7) {
    lengthMemorial = 5
  } else{
    lengthMemorial = 2
  }
  let seatSizeMemorial = getWidthForSeats(lengthMemorial);

  if (assento === 'memorial') {
    return { 
      width: seatSizeMemorial - 20, 
      height: seatSizeMemorial - 20, 
      top: `calc(50% - ${seatSizeMemorial + 50}px/2)`,
      left: `calc(50% - ${seatSizeMemorial}px/2)`
    }
  }

  if (length >= 4) {
    seatSize = getWidthForSeats(lengthAssento + 4);

    const disanceRatio = getDistanceRatioForSeats(lengthAssento );
    const angle = (360 / lengthAssento) * index;
    const horizontal = Math.cos(angle * 2 * Math.PI / 360) * disanceRatio;
    const vertical = Math.sin(angle * 2 * Math.PI / 360) * disanceRatio;
  
    return { 
      width: seatSize - 20, 
      height: seatSize - 20, 
      top: `calc(50% - ${seatSize + 10}px/2  + ${vertical}%)`, 
      left: `calc(50% - ${seatSize}px/2 + ${horizontal}%)`,
    }    
  } 
  if (length <= 1) {
   
    return { 
      width: seatSize - 20, 
      height: seatSize - 20, 
      top: `calc(50% - ${seatSize + 10}px/2)`, 
      left: `calc(50% - ${seatSize}px/2 ${index % 2 === 0? '-':'+' } ${seatSize + 50 }px)`,
    }    
  } 
  if (length >= 2 && length <= 3) {
   
    return { 
      width: seatSize - 20, 
      height: seatSize - 20, 
      top: `calc(50% - ${seatSize + 10}px/2 ${index <=1 ? '-':'+' } ${seatSize / 2 }px)`, 
      left: `calc(50% - ${seatSize}px/2 ${index % 2 === 0? '-':'+' } ${seatSizeMemorial }px)`,
    }    
  } 
};

export const familiaridadeTipo = (e) =>{
  const valor = e.split(' | ')
  return {name: valor[0], familiaridade: valor[1]}
}
