import data from "../../data/industry.json"

const actions = {
    GetIndustrySuccess: (payload) => {
        return {
            type: 'GET_INDUSTRY_SUCCESS',
            payload: payload,
        };
    },
    GetIndustryError: (payload) => {
        return {
            type: 'GET_INDUSTRY_ERROR',
            payload: payload,
        };
    }

};

export const fetchIndustry = () => (dispatch, getState) => {
    let cat = data.Industry;
    dispatch(actions.GetIndustrySuccess(cat));

};