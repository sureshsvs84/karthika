import Dimensions from './dimensions'
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

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions);


