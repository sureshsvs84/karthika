import CustomerForm from './customerForm'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {createCustomer, fetchAllCustomers, fetchCategory, fetchIndustry, saveCustomer} from '../../actions';


const mapStateToProps = (state, ownProps) => {
    return {
        customer: state.customer.list[ownProps.currentCustomer && ownProps.currentCustomer.id],
        categoryList: state.category.list,
        industryList: state.industry.list
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchAllCustomers,
                fetchCategory,
                fetchIndustry,
                saveCustomer,
                createCustomer
            }, dispatch
        )
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
