const initialState = {
    list: [],
    error: {}
};

const store = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_OPERATIONS_SUCCESS':
            state = {
                ...state,
                list: action.payload
            };
            return state;
        case 'FETCH_OPERATIONS_ERROR':
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