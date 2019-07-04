import React, {Fragment} from 'react';
import {Row} from 'react-materialize';
import FormModal from "../../../components/base/formModal";
import {TatvamGrid} from "../../../functionalComponents";

class UsersGrid extends React.Component {
    __onEditRowClick = (data) => {
        this.setState({
            editUser: true,
            userData: data
        })
    };
    __onDeleteRowClick = (data) => {
        alert("Delete");
    };
    _closeModal = (name) => {
        this.setState({
            [name]: false
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            colDef: [{headerName: 'User Name', field: 'user_name'}, {
                headerName: 'Email',
                field: 'email'
            }, {headerName: 'Display Name', field: 'display_name'}, {headerName: 'Status', field: 'status'}],
            userData: [],
            editUser: false
        };
        this.__onEditRowClick = this.__onEditRowClick.bind(this);
        this.__onDeleteRowClick = this.__onDeleteRowClick.bind(this);
    }

    componentDidMount() {
        if (this.props.usersList) {
            this.setState({users: this.props.usersList})
        }
    }

    componentWillReceiveProps(props) {
        if (props.usersList) {
            this.setState({users: props.usersList})
        }
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <TatvamGrid gridData={this.state.users} colData={this.state.colDef}
                                onRowEdit={this.__onEditRowClick} onRowDelete={this.__onDeleteRowClick}/>
                    {/* {this.state.editUser && */}
                    <FormModal open={this.state.editUser} customerId={this.props.customerId}
                               roleList={this.props.customer && this.props.customer.roles}
                               userData={this.state.userData} closeModal={this._closeModal}
                               title="Edit User"> </FormModal>

                    {/* } */}
                </Row>
            </Fragment>
        )
    }
}

export default UsersGrid;