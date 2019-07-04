import {fetchCategory} from "./categoryActions";
import {fetchIndustry} from "./industryActions";
import {createCustomer, fetchAllCustomers, saveCustomer} from "./customerActions";
import {createRoles, editRoles, fetchCustomerRoles} from "./customerRolesAction";
import {createUsers, editUsers, fetchCustomerUser} from "./customerUsersAction";
import {fetchAllOperations} from "./operationActions";
import {fetchAllReports} from "./reportsActions";


export {
    fetchCategory,
    fetchIndustry,
    saveCustomer,
    fetchAllCustomers,
    fetchCustomerUser,
    fetchCustomerRoles,
    createRoles,
    editRoles,
    createUsers,
    editUsers,
    fetchAllOperations,
    fetchAllReports,
    createCustomer,

};
