import RolesGrid from './roles'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchCustomerRoles} from '../../../actions';

const mapStateToProps = (state) => {
    return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(RolesGrid);


