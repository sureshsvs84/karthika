import React, {Component} from 'react';

class DeleteColumn extends Component {
    selectedRow = () => {
        this.props.deleteAction(this.props.data);
    };

    render() {
        return (
            <a className="deleteColumn" onClick={this.selectedRow}><i className="material-icons"
                                                                      title='Delete'>delete</i></a>
        );
    }
}

export default DeleteColumn;