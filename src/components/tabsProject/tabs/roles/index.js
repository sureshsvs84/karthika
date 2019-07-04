import Roles from './roles'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchCustomerRoles} from "../../../../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        customer: state.customer.list[ownProps.currentCustomerId]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchCustomerRoles
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);


