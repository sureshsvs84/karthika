import {combineReducers} from 'redux';
import category from './categoryReducer';
import customer from './customerReducer';
import industry from './industryReducer';
import operations from './operationsReducer';
import reports from './reportsReducer';
import error from './errorReducer';


export default combineReducers({
    customer,
    category,
    industry,
    operations,
    reports,
    error
});
