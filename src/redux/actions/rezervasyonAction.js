import * as actionTypes from "./actionTypes";
//db deki güncel zamanlı rezervasyonları initialState'e gönder

export function getRezerv(rezerv) {
  return {
    type: actionTypes.GET_RESERV,
    payload: rezerv,
  };
}
