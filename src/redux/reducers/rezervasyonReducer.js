import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function rezervasyonReducer(
  state = initialState.rezervasyon,
  action
) {
  switch (action.type) {
    case actionTypes.GET_RESERV:
      return action.payload;

    default:
      return state;
  }
}
