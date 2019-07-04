import UsersGrid from './user'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchCustomerUser} from '../../../actions';


const mapStateToProps = (state) => {
    return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersGrid);


