import {apiUrl} from 'appConstants';
import axios from "axios";

const actions = {
    GetAllOperationsSuccess: (payload) => {
        return {
            type: 'FETCH_OPERATIONS_SUCCESS',
            payload: payload,
        };
    },
    GetAllOperationsError: (payload) => {
        return {
            type: 'FETCH_OPERATIONS_ERROR',
            payload: payload,
        };
    }
};


export const fetchAllOperations = () => (dispatch, getState) => {
    let state = getState();
    // Check the store for operations list if it's not empty then return the store data to the caller.    
    if (state.operations.list.length > 0) {
        return dispatch(actions.GetAllOperationsSuccess(state.operations.list));
    }
    const url = apiUrl.BASE_URL + apiUrl.GET_OPERATIONS;

    return axios
        .get(url)
        .then(response => {
            if (response.status == 200) {
                dispatch(actions.GetAllOperationsSuccess(response.data.data));
                return response;
            } else {
                dispatch(action.GetAllOperationsError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.GetAllOperationsError(error.message));
            return error.message;
        });
};