import * as actionTypes from "./actionTypes";

export function getCarSuccess(cars) {
  return {
    type: actionTypes.GET_CARS_SUCCESS,
    payload: cars,
  };
}
export function getCars() {
  return function (dispatch) {
    let url = "http://localhost:3001/cars/get";
    return fetch(url)
      .then((req) => req.json())
      .then((res) => dispatch(getCarSuccess(res)))
      .catch((error) => console.log("db'den araçları çekerken hata : ", error));
  };
}
