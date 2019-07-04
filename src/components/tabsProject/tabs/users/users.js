import React, {Component, Fragment} from 'react';
import {Col, Input} from 'react-materialize';
import FormModal from "../../../base/formModal";
import {TatvamButton} from "../../../../functionalComponents";
import UsersList from "../../../../applicationComponent/users/list";

class Users extends Component {
    _addUser = (e) => {
        this.setState({
            [e.currentTarget.name]: true
        })
    };
    closeModal = (name) => {
        // let name = name;
        this.setState({
            [name]: false
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            addUser: false,
            editUser: false,
            customerIndex: "",
        }
    }

    componentDidMount() {
        //Fetch data needed by the component by raising an action
        this.props.actions.fetchCustomerUser(this.props.currentCustomerId);
        if (this.props.customer) {
            this.setState({users: this.props.customer.users})
        }
    }

    componentWillReceiveProps(props) {
        if (props.customer) {
            this.setState({users: props.customer.users})
        }
    }

    componentWillUnmount() {
        // 1.check whether changes are compeleted
        // 2.alert the user that unsaved data will be lost if they have any uncompeleted changes
    }

    render() {
        return <Fragment>
            {/* <TatvamButton className="mt-1 ml-1 mr-1 right btn_primary" name="editUser" onClick={this._addUser}>Edit User</TatvamButton> */}
            <TatvamButton className="mt-2 ml-2 mr-2 mb-2  right btn_primary" name="addUser" onClick={this._addUser}>Add
                User</TatvamButton>
            {/* {this.state.addUser && */}
            <FormModal open={this.state.addUser} customerId={this.props.currentCustomerId} closeModal={this.closeModal}
                       rolesList={this.props.customer && this.props.customer.roles} title="Add User"> </FormModal>

            {/* } */}

            <Col s={12} className="roleGrid">
                <UsersList customerId={this.props.currentCustomerId} usersList={this.state.users}/>
            </Col>
        </Fragment>
    }
}

export default Users;