import SideMenu from './sideMenu'
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);


