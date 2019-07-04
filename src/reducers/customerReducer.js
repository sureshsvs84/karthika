const initialState = {
    list: [],
    error: {}
};

const store = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CUSTOMER_SUCCESS':
            state = {
                ...state,
                list: action.payload
            };
            return state;
        case 'FETCH_CUSTOMER_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case 'SAVE_CUSTOMER_SUCCESS':
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                },
            };
        case 'SAVE_CUSTOMER_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case "FETCH_CUSTOMER_ROLE_SUCCESS":
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                },
            };
            return state;
        case "FETCH_CUSTOMER_ROLE_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case 'EDIT_CUSTOMER_ROLE_SUCCESS':
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                },
            };
            return state;
        case 'EDIT_CUSTOMER_ROLE_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case 'CREATE_CUSTOMER_ROLE_SUCCESS':
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                }
            };
            return state;
        case 'CREATE_CUSTOMER_ROLE_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case "FETCH_CUSTOMER_USER_SUCCESS":
            state = {
                ...state,
                list: {
                    ...state.list
                }
            };
            return state;
        case "FETCH_CUSTOMER_USER_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case 'EDIT_CUSTOMER_USER_SUCCESS':
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                }
            };
            return state;

        case 'EDIT_CUSTOMER_USER_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;
        case 'CREATE_CUSTOMER_USER_SUCCESS':
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                }
            };
            return state;

        case 'CREATE_CUSTOMER_USER_ERROR':
            state = {
                ...state,
                error: action.payload
            };
            return state;

        case "CREATE_CUSTOMER_SUCCESS":
            state = {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                },
            };
            return state;

        case "CREATE_CUSTOMER_ERROR":
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


