import {apiUrl} from 'appConstants';
import axios from "axios";
//TODO : Need to remove this later
const format = require('string-format');
format.extend(String.prototype, {});


const actions = {
    EditCustomerRolesSuccess: (payload) => {
        return {
            type: 'EDIT_CUSTOMER_ROLE_SUCCESS',
            payload: payload,
        };
    },
    EditCustomerRolesError: (payload) => {
        return {
            type: 'EDIT_CUSTOMER_ROLE_ERROR',
            payload: payload,
        };
    },
    CreateCustomerRolesSuccess: (payload) => {
        return {
            type: 'CREATE_CUSTOMER_ROLE_SUCCESS',
            payload: payload,
        };
    },
    CreateCustomerRolesError: (payload) => {
        return {
            type: 'CREATE_CUSTOMER_ROLE_ERROR',
            payload: payload,
        };
    },
    GetCustomerRolesSuccess: (payload) => {
        return {
            type: 'FETCH_CUSTOMER_ROLE_SUCCESS',
            payload: payload,
        };
    },
    GetCustomerRolesError: (payload) => {
        return {
            type: 'FETCH_ROLE_ERROR',
            payload: payload,
        };
    }
};

export const editRoles = (customerId, role) => (dispatch, getState) => {
    const state = getState();
    const customer = state.customer.list[customerId];
    let roleIndex = "";
    customer.roles.map((data, index) => {
        if (data.name == role.name) {
            roleIndex = index;
        }
    });

    customer.roles[roleIndex] = role;
    const payload = customer;
    const url = apiUrl.BASE_URL + apiUrl.UPDATE_CUSTOMER_ROLES;
    return axios
        .patch(url, payload)
        .then(response => {
            if (response.status == 200) {
                let customerData = customer[id];
                customerData  = {
                    ...customerData ,
                    roles : response.data.data[0].roles
                }
                dispatch(actions.CreateCustomerRolesSuccess(customerData));
                return response;
            } else {
                dispatch(action.EditCustomerRolesError(response.message));
                return response;

            }
        })
        .catch(error => {
            dispatch(actions.EditCustomerRolesError(error.message));
            return error.message;
        });
};


export const createRoles = (customerId, role) => (dispatch, getState) => {
    const store = getState();
    let customer = store.customer.list[customerId];
    customer = {
        ...customer,
        roles: [...customer.roles, role]
    };
    const payload = customer;
    dispatch(actions.CreateCustomerRolesSuccess(customer));

    // const url = apiUrl.BASE_URL + apiUrl.CREATE_CUSTOMER_ROLES;
    // return axios
    //     .post(url, payload)
    //     .then(response => {
    //         if (response.status == 200) {
    //             let customerData = customer[id];
    //             customerData  = {
    //                 ...customerData ,
    //                 roles : response.data.data[0].roles
    //             }
    //             dispatch(actions.CreateCustomerRolesSuccess(customerData));
    //             return response;
    //         } else {
    //             dispatch(action.CreateCustomerRolesError(response.message));
    //             return response;
    //
    //         }
    //     })
    //     .catch(error => {
    //         dispatch(actions.CreateCustomerRolesError(error.message));
    //         return error.message;
    //     });
};

export const fetchCustomerRoles = (id) => (dispatch, getState) => {
    if (id) {
        let state = getState();
        let customer = state.customer.list;
        let i = "";
        //Check the state if exist return the data from state
        if (customer[id].roles) {
            if (customer[id].roles.length > 0) {
                dispatch(actions.GetCustomerRolesSuccess(customer));
            }
        }
        const url = apiUrl.BASE_URL + apiUrl.GET_CUSTOMER_ROLES.format(id);

        return axios
            .get(url)
            .then(response => {
                if (response.status == 200) {
                    let customerData = customer[id];
                    customerData  = {
                        ...customerData ,
                        roles : response.data.data[0].roles
                    }

                    dispatch(actions.GetCustomerRolesSuccess(customerData ));
                    return response;

                } else {
                    dispatch(action.GetCustomerRolesError(response.message));
                    return response;
                }
            })
            .catch(error => {
                dispatch(actions.GetCustomerRolesError(error.message));
                return error.message;
            });
    }
};
