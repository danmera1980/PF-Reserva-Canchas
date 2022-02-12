import { ALL_USERS, USER_DATA } from '../actions/actionNames';

const initialState = {
    //para el admin
    users: [],
    //user details para enviar la info que necesita el perfil
    userDetails: [],
    //un temporal para los filtros del admin
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
        
        default:
            return state;
    }
}

export default userReducer;