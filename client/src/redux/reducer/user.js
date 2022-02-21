import { ALL_USERS, LOGOUT, USER_DATA, USER_FAV } from '../actions/actionNames';

const initialState = {
    //para el admin
    users: [],
    //user details para enviar la info que necesita el perfil
    userDetails: [],
    //un temporal para los filtros del admin
    userFav:[]
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_USERS:
            return {
                ...state,
                users: action.payload
            };

        case USER_DATA: 
        return {
            ...state,
            userDetails: action.payload 
        }
        case USER_FAV:
            return{
                ...state,
                userFav: action.payload
            }
        case LOGOUT:
            return{
                ...state,
                userFav: []
            }
        
        default:
            return state;
    }
}

export default userReducer;