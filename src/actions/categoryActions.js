import data from "../../data/category.json";


const actions = {
    GetCategorySuccess: (payload) => {
        return {
            type: 'GET_CATEGORY_SUCCESS',
            payload: payload,
        };
    },
    GetCategoryError: (payload) => {
        return {
            type: 'GET_CATEGORY_Error',
            payload: payload,
        };
    }
};

export const fetchCategory = () => (dispatch, getState) => {
    let Cat = data.Category;
    dispatch(actions.GetCategorySuccess(Cat));
};