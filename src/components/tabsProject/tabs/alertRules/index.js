import AlertRules from './alertRules'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {},
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertRules);


