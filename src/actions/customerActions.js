import {apiUrl} from 'appConstants';
import axios from "axios";

//TODO : Need to remove this later
const format = require('string-format');
format.extend(String.prototype, {});

const actions = {
    GetCustomerSuccess: (payload) => {
        return {
            type: 'FETCH_CUSTOMER_SUCCESS',
            payload: payload,
        };
    },
    GetCustomerError: (payload) => {
        return {
            type: 'FETCH_CUSTOMER_ERROR',
            payload: payload,
        };
    },
    SaveCustomerSuccess: (payload) => {
        return {
            type: 'SAVE_CUSTOMER_SUCCESS',
            payload: payload,
        };
    },
    SaveCustomerError: (payload) => {
        return {
            type: 'CREATE_CUSTOMER_ERROR',
            payload: payload,
        };
    },
    CreateCustomerSuccess: (payload) => {
        return {
            type: 'CREATE_CUSTOMER_SUCCESS',
            payload: payload,
        };
    },
    CreateCustomerError: (payload) => {
        return {
            type: 'CREATE_CUSTOMER_ERROR',
            payload: payload,
        };
    },


};

export const saveCustomer = (customerData) => (dispatch, getState) => {
    const payload = customerData;
    const url = apiUrl.BASE_URL + apiUrl.CREATE_CUSTOMER;
    return axios
        .patch(url, payload)
        .then(response => {
            if (response.status == 200) {
                dispatch(actions.SaveCustomerSuccess(response.data.data[0]));
                return response;
            } else {
                dispatch(action.SaveCustomerError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.SaveCustomerError(error.message));
            return error.message;
        });
};


export const fetchAllCustomers = (category) => (dispatch, getState) => {
    let store = getState();
    if (store.customer.list.length > 0) {
        return dispatch(actions.GetCustomerSuccess(state.customer.list));
    }
    const url = apiUrl.BASE_URL + apiUrl.READ_CUSTOMER_CATEGORY + category;

    return axios
        .get(url)
        .then(response => {
            if (response.status == 200) {
                let custList = {};
                response.data.data.map((data, index) => {
                    custList[data.id] = data;
                });
                dispatch(actions.GetCustomerSuccess(custList));
                return response;
            } else {
                dispatch(action.GetCustomerError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.GetCustomerError(error.message));
            return Promise.resolve(error);
        });
};

const toObject = (arr, key) => {
    arr.map((data, index) => {
    })
};

export const createCustomer = (customerData) => (dispatch, getState) => {
    const payload = customerData;

    const url = apiUrl.BASE_URL + apiUrl.CREATE_CUSTOMER;
    return axios
        .post(url, payload)
        .then(response => {
            if (response.status == 200) {
                dispatch(actions.CreateCustomerSuccess(response.data.data[0]));
                return response;
            } else {
                dispatch(action.CreateCustomerError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.CreateCustomerError(error.message));
            return error.message;
        });
};


export const fetchCustomerUser = (id) => (dispatch, getState) => {
    //Currently Hardcoding customer id    
    var customer_id = "1002";
    // let state = getState();
    // let customer = state.customer.list;
    // let i = "";
    // const customerUser = require("../../data/user.json");
    // customer.map((data, index) => {
    //     // console.log(data.id == id)
    //     if (data.id == id) {
    //         i = index;
    //         console.log(index)
    //     }

    // })
    // if (i !== "") {
    //     customer[i] = {
    //         ...customer[i],
    //         users: customerUser.users
    //     };
    // }
    // dispatch(actions.GetCustomerUserSuccess(customer));

    const url = apiUrl.BASE_URL + apiUrl.GET_CUSTOMER_USERS.format(id);

    return axios
        .get(url)
        .then(response => {
            if (response.status == 200) {
                dispatch(actions.GetCustomerUserSuccess(response.data.data));
                return response;
            } else {
                dispatch(action.GetCustomerUserError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.GetCustomerUserError(error.message));
            return error.message;
        });
};


