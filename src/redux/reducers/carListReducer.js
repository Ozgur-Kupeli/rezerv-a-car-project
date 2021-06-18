import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function carListReducer(state = initialState.cars, action) {
  switch (action.type) {
    case actionTypes.GET_CARS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
