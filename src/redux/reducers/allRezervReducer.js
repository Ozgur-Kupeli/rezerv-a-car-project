import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function allRezervReducer(state = initialState.rezervs, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_REZERVS:
      return action.payload;

    default:
      return state;
  }
}
