import {apiUrl} from 'appConstants';
import axios from "axios";
//TODO : Need to remove this later
const format = require('string-format');
format.extend(String.prototype, {});

const actions = {
    EditCustomerUserSuccess: (payload) => {
        return {
            type: 'EDIT_CUSTOMER_USER_SUCCESS',
            payload: payload,
        };
    },
    EditCustomerUserError: (payload) => {
        return {
            type: 'EDIT_CUSTOMER_USER_ERROR',
            payload: payload,
        };
    },

    GetCustomerUserSuccess: (payload) => {
        return {
            type: "FETCH_CUSTOMER_USER_SUCCESS",
            payload: payload
        };
    },
    GetCustomerUserError: (payload) => {
        return {
            type: "FETCH_CUSTOMER_USER_ERROR",
            payload: payload
        };
    },
    CreateUserSuccess: (payload) => {
        return {
            type: "CREATE_CUSTOMER_USER_SUCCESS",
            payload: payload
        };
    },
    CreateUserError: (payload) => {
        return {
            type: "CREATE_CUSTOMER_USER_ERROR",
            payload: payload
        };
    }
};
export const editUsers = (customerId, user) => (dispatch, getState) => {
    const state = getState();
    const customer = state.customer.list[customerId];
    let userIndex = "";
    customer.users.map((data, index) => {
        if (data.user_name == user.user_name) {
            userIndex = index;
        }
    });
    if (userIndex) {
        customer.users[userIndex] = user;
    }

    const payload = customer;
    const url = apiUrl.BASE_URL + apiUrl.UPDATE_CUSTOMER_USERS;
    return axios
        .patch(url, payload)
        .then(response => {
            if (response.status == 200) {
                dispatch(actions.EditCustomerUserSuccess(response.data.data[0]));
                return response;
            } else {
                dispatch(action.EditCustomerUserError(response.message));
                return response;
            }
        })
        .catch(error => {
            dispatch(actions.EditCustomerUserError(error.message));
            return error.message;
        });
};


export const fetchCustomerUser = (id) => (dispatch, getState) => {
    if (id) {
        let state = getState();
        let customer = state.customer.list;
        let i = "";
        //Check the state if exist return the data from state
        if (customer[id].users) {
            if (customer[id].users.length > 0) {
                dispatch(actions.GetCustomerUserSuccess(customer));
            }
        }
        const url = apiUrl.BASE_URL + apiUrl.GET_CUSTOMER_USERS.format(id);

        return axios
            .get(url)
            .then(response => {
                if (response.status == 200) {
                    customer[id] = {
                        ...customer[id],
                        users: response.data.data[0].users
                    };
                    dispatch(actions.GetCustomerUserSuccess(customer));
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
    }
};


export const createUsers = (customerId, user) => (dispatch, getState) => {
    const state = getState();
    let customer = state.customer.list[customerId];
    customer = {
        ...customer,
        users: [...customer.users, user]

    };
    const payload = customer;
    dispatch(actions.CreateUserSuccess(customer));
    // const url = apiUrl.BASE_URL + apiUrl.CREATE_CUSTOMER_USERS;
    //
    // return axios
    //     .post(url, payload)
    //     .then(response => {
    //         if (response.status == 200) {
    //             dispatch(actions.CreateUserSuccess(response.data.data));
    //             return response;
    //         } else {
    //             dispatch(action.CreateUserError(response.message));
    //             return response;
    //         }
    //     })
    //     .catch(error => {
    //         dispatch(actions.CreateUserError(error.message));
    //         return error.message;
    //     });
};
