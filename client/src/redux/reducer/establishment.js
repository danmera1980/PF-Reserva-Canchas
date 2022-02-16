import {
  SEARCH_TEXT,
  GET_GEOCODE,
  GET_ESTABLISHMENT_BY_ID,
  LOGOUT,
} from "../actions/actionNames";

const initialState = {
  establishmentId: "",
  establishments: [],
  geocode: [],
};

const establishmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ESTABLISHMENT_BY_ID:
      return {
        ...state,
        establishmentId: action.payload,
      };

    case SEARCH_TEXT:
      return {
        ...state,
        establishments: action.payload,
      };

    case GET_GEOCODE:
      return {
        ...state,
        geocode: action.payload,
      };

    case LOGOUT:
      return {
        establishmentId: "",
      };
    default:
      return state;
  }
};

export default establishmentReducer;
