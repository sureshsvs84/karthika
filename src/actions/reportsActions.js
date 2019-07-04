import {apiUrl} from 'appConstants';
import axios from "axios";

const actions = {
    GetAllReportsSuccess: (payload) => {
        return {
            type: 'FETCH_REPORTS_SUCCESS',
            payload: payload,
        };
    },
    GetAllReportsError: (payload) => {
        return {
            type: 'FETCH_REPORTS_ERROR',
            payload: payload,
        };
    }
};


export const fetchAllReports = () => (dispatch, getState) => {
    let state = getState();
    // Check the store for reports list if it's not empty then return the store data to the caller.    
    if (state.reports.list.length > 0) {
        return dispatch(actions.GetAllReportsSuccess(state.reports.list));
    }
    const url = apiUrl.BASE_URL + apiUrl.GET_REPORTS;

    return axios
        .get(url)
        .then(response => {
            if (response.status == 200) {
                dispatch(actions.GetAllReportsSuccess(response.data.data));
                return response;
            } else {
                dispatch(action.GetAllReportsError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.GetAllReportsError(error.message));
            return error.message;
        });
};