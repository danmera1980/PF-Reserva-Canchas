const initialState = {
    usersEstablishment: []
}

const postEstablishmentReducer = (state = initialState, action) => {
    switch(action.type){
        case "POST_ESTABLISHMENT":
            return {
                ...state,
            };
        
        default:
            return state;
    }
}

export default postEstablishmentReducer; 