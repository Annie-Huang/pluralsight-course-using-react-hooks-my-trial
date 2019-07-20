// 3: Further change to a reducer like logic...
//    You can think of this as useState is just useReducer with only a default action type.
// function speakerReducer(state, action) {
const speakerReducer = (state, action) => {
    // action has:
    // {
    //     type:
    //     data:
    //     sessionId
    // }


    // inner function??? =|
    function updateFavorite(favoriteValue) {
        return state.map((item, index) => {
            if (item.id === action.sessionId) {
                item.favorite = favoriteValue;
                // return item; // redundant code: it's already return outside the if loop.
            }
            return item;
        });
    }
    switch (action.type) {
        case "setSpeakerList": {
            return action.data;
        }
        case "favorite": {
            return updateFavorite(true);
        }
        case "unfavorite": {
            return updateFavorite(false);
        }
        default:
            return state;
    }
    // return action;
};

export default speakerReducer;
