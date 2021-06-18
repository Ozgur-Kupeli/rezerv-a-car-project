//araç üçret kısımlarının görünüp görünmeyeceği
//tarih seçilmedikçe görünmesin

import * as actionTypes from "./actionTypes";
export const trueDisplay = () => ({
  type: actionTypes.TRUE_DİSPLAY,
  payload: true,
});
export const falseDisplay = () => ({
  type: actionTypes.FALSE_DİSPLAY,
  payload: false,
});
