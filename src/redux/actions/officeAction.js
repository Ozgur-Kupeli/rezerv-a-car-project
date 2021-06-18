import * as actionTypes from "./actionTypes";

export function getOfficeSuccess(offices) {
  return {
    type: actionTypes.GET_OFFİCES_SUCCESS,
    payload: offices,
  };
}
export function getOffices() {
  return function (dispatch) {
    let url = "http://localhost:3001/offices/get";
    return fetch(url)
      .then((req) => req.json())
      .then((res) => dispatch(getOfficeSuccess(res)))
      .catch((error) => console.log("db'den araçları çekerken hata : ", error));
  };
}
