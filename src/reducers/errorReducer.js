const initialState = {};

const store = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;
        default:
            return state;
    }
};

export default store;