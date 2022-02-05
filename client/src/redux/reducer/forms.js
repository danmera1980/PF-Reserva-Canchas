import {GET_ESTABLISHMENT_BY_ID, GET_SITES_BY_ESTAB_ID} from "../actions/actionNames";

const initialState = {
    establishmentId:'',
    sitesByEstablishment: [],
}

const formsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ESTABLISHMENT_BY_ID:
            return {
                ...state,
                establishmentId: action.payload
            };
        case GET_SITES_BY_ESTAB_ID:
            return{
                ...state,
                sitesByEstablishment : action.payload
            }
        default:
            return state;
    }
}

export default formsReducer; 