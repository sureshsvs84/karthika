import {connect} from "react-redux";
import Dashboard from "./dashboard";
import {bindActionCreators} from "redux";
import {fetchAllCustomers} from '../../actions';

const mapStateToProps = (state) => {
    return {
        customerList: state.customer.list
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchAllCustomers
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
