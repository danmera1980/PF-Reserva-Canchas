const initialState = {
    usersSites: []
}

const postSiteReducer = (state = initialState, action) => {
    switch(action.type){
        case "POST_SITE":
            return {
                ...state,
            };
        
        default:
            return state;
    }
}

export default postSiteReducer; 