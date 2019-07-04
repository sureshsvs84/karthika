import React, {Component} from 'react';

class EditColumn extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    };

    render() {
        return (
            <a className="editColumn" onClick={this.selectedRow}><i className="material-icons" title='Edit'>edit</i></a>
        );
    }
}

export default EditColumn;