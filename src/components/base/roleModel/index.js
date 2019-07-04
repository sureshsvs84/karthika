import RoleModal from './roleModal';
import {createRoles, editRoles, fetchAllOperations, fetchAllReports} from '../../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


const mapStateToProps = (state, ownProps) => {
    return {
        operationsList: state.operations.list,
        reportsList: state.reports.list
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                editRoles,
                createRoles,
                fetchAllReports,
                fetchAllOperations
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleModal);

