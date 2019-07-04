import {connect} from 'react-redux';
import ListView from './listView';
import {bindActionCreators} from 'redux';
import {cloneProject, exportProject, fetchSingleTenant} from '../../../actions'

const mapStateToProps = (state) => {
    return {
        customerList: state.customer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                exportProject,
                cloneProject,
                fetchSingleTenant
            }, dispatch
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);