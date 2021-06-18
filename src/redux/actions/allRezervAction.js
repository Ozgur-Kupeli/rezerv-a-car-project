import * as actionTypes from "./actionTypes";

export function getRezervsSuccess(rezervs) {
  return {
    type: actionTypes.GET_ALL_REZERVS,
    payload: rezervs,
  };
}
export function getAllRezerv() {
  return function (dispatch) {
    let url = "http://localhost:3001/api/v2/reservation";
    return fetch(url)
      .then((req) => req.json())
      .then((res) => dispatch(getRezervsSuccess(res)))
      .catch((error) => console.log("db'den araçları çekerken hata : ", error));
  };
}
