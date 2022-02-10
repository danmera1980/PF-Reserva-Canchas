import { ALL_ESTABLISHMENTS, FILTER_BY_LOCATION, SEARCH_TEXT, FILTER_BY_SPORT, GET_ESTABLISHMENT, SORT_BY_AVAILABILITY, SORT_BY_PRICE, GET_GEOCODE } from "../actions/actionNames";

const initialState = {
    establishments : [],
    establishmentDetail : [],
    geocode: []
}

const establishmentReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ESTABLISHMENT:
            return{
                ...state,
                establishmentDetail: action.payload
            }
        case ALL_ESTABLISHMENTS:
            return{
                ...state,
                establishments: action.payload
            }
        case FILTER_BY_SPORT:
            return{
                ...state,
                establishments: action.payload
            }
        case FILTER_BY_LOCATION:
            return{
                ...state,
                establishments: action.payload
            }
        case SEARCH_TEXT:
            return{
                ...state,
                establishments: action.payload
            }
        case SORT_BY_PRICE:
            return{
                ...state,
                establishments: action.payload
            }
        case SORT_BY_AVAILABILITY:
            return{
                ...state,
                establishments: action.payload
            }

        case GET_GEOCODE:
            return {
                ...state,
                geocode: action.payload
            }
        default: 
            return state
    }
}

export default establishmentReducer