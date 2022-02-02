import { ALL_USERS } from '../actions/actionNames';

const initialState = {
    //para el admin
    users: [],
    //user details para enviar la info que necesita el perfil
    //un temporal para los filtros del admin
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_USERS:
            return {
                ...state,
                users: action.payload
            };
        
        default:
            return state;
    }
}

export default userReducer;