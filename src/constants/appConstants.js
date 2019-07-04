export const appConstants = {
    ELEMENT_TO_BOOTSTRAP: 'app',
    ORDER_GRID_PAGE_SIZE: 10
};


export const appSettings = {};

export const appRoutes = {};

export const apiUrl = {
    BASE_URL: "http://localhost:3000/3.0/",
    READ_CUSTOMER_CATEGORY: 'customer/category/',
    CREATE_CUSTOMER: 'customer',
    UPDATE_CUSTOMER: 'customer',
    GET_CUSTOMER_USERS: 'customer/{0}/users',
    CREATE_CUSTOMER_USERS: 'customer/users',
    UPDATE_CUSTOMER_USERS: 'customer/users',
    GET_CUSTOMER_ROLES: 'customer/{0}/roles',
    CREATE_CUSTOMER_ROLES: 'customer/roles',
    UPDATE_CUSTOMER_ROLES: 'customer/roles',
    GET_OPERATIONS: 'operations',
    GET_REPORTS: 'reports',
};


export function RequestPayload(applicationName, requestType, inputData = {}) {
    this.requestType = requestType;
    this.data = inputData;
    this.applicationName = applicationName;
}

export const httpMethodType = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
