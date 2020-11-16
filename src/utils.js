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
  let lengthAssento = length + 2

  if (length > 4 ){ //length <= 10) {
    lengthAssento = length + 1
  }

  let seatSize = getWidthForSeats(lengthAssento);

  if (assento === 'memorial') {
    let lengthMemorial = lengthAssento
    if (length > 5 && length < 8) {
      lengthMemorial = 3
    } else if (length >= 8) {
      lengthMemorial = 5
    }
    seatSize = getWidthForSeats(lengthMemorial);
  }

  const disanceRatio = getDistanceRatioForSeats(lengthAssento );
  const angle = (360 / lengthAssento) * index;
  const horizontal = Math.cos(angle * 2 * Math.PI / 360) * disanceRatio;
  const vertical = Math.sin(angle * 2 * Math.PI / 360) * disanceRatio;

  
  if (assento === 'memorial' && length > 4) {
    return { 
      width: seatSize - 20, 
      height: seatSize - 20, 
      top: `calc(50% - ${seatSize + 50}px/2)`,
      left: `calc(50% - ${seatSize}px/2)`
      // top: `calc(50% - ${seatSize + 10}px/2  + ${vertical}%)`, 
      // left: `calc(50% - ${seatSize}px/2 + ${horizontal}%)`,
    }
  }
  return { 
    width: seatSize - 20, 
    height: seatSize - 20, 
    top: `calc(50% - ${seatSize + 10}px/2  + ${vertical}%)`, 
    left: `calc(50% - ${seatSize}px/2 + ${horizontal}%)`,
  }
};


const PA = (index, length, assento) => {
  let lengthAssento = length + 2

  switch (lengthAssento) {
    case 2: return {
      index
    };
    default: return ;
  }
};

export const posicaoAssentoo = (index, length, assento) => {
  let lengthAssento = length + 2

  switch (lengthAssento) {
    case 2: return PA(index);
    default: return ;
  }
};
