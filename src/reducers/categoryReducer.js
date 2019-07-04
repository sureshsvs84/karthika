const initialState = {
    list: [],
    error: {}
};

const store = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_SUCCESS':
            state = {
                ...state,
                list: action.payload
            };
            return state;
        default:
            return state;
    }
};

export default store;