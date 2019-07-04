import Users from './users'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchCustomerUser} from "../../../../actions"

const mapStateToProps = (state, ownProps) => {
    return {
        customer: state.customer.list[ownProps.currentCustomerId]

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchCustomerUser
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);


