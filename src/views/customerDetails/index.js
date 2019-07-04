import CustomerDetails from './customerDetails';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchAllCustomers} from "../../actions"


const mapStateToProps = (state, ownProps) => {
    return {
        customerList: state.customer.list[ownProps.location.state.id]
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchAllCustomers
        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);