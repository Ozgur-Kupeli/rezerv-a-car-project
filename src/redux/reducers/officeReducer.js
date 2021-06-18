import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function officeReducer(state = initialState.offices, action) {
  switch (action.type) {
    case actionTypes.GET_OFFİCES_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
