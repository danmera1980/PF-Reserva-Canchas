import { ALL_USERS, EDIT_SUCCESS, SET_ERRORS } from '../actions/actionNames';

const initialState = {
    //para el admin
    users: [],
    //user details para enviar la info que necesita el perfil
    userDetails: [],
    //un temporal para los filtros del admin
    userErrors:[], // se cargan los errores de login, register y edit user
    userMessage:[] // mensajes de respuestas
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_USERS:
            return {
                ...state,
                users: action.payload
            };
        case EDIT_SUCCESS:
            return {
                ...state,
                userMessage: action.payload
            }
        case SET_ERRORS:
            return{
                ...state,
                userErrors: action.payload
            }
        
        default:
            return state;
    }
}

export default userReducer;