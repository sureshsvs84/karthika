import FormModal from './fromModal';
import {createUsers, editUsers} from '../../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                editUsers,
                createUsers
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(FormModal);

