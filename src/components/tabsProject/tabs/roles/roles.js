import React, {Component, Fragment} from 'react';
import {Col} from 'react-materialize';
import RoleModal from "../../../base/roleModel";
import RolesList from "../../../../applicationComponent/roles/list";
import {TatvamButton} from "../../../../functionalComponents";

class Roles extends Component {
    _addRole = (e) => {
        this.setState({
            [e.currentTarget.name]: true
        })
    };
    closeModal = (name) => {
        this.setState({
            [name]: false
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            addRole: false,
            roles: []
        };
        this.roles = "";
    }

    componentDidMount() {
        //Fetch data needed by the component by raising an action

        this.props.actions.fetchCustomerRoles(this.props.currentCustomerId);
        if (this.props.customer) {
            this.setState({roles: this.props.customer.roles})
        }
    }

    componentWillReceiveProps(props) {
        // this.props.actions.fetchCustomerRoles(this.props.currentCustomer.id);
        if (props.customer) {
            this.setState({roles: props.customer.roles})
        }
    }

    componentWillUnmount() {
        // 1.check whether changes are compeleted
        // 2.alert the user that unsaved data will be lost if they have any uncompeleted changes
    }

    render() {
        return (
            <Fragment>
                {/* <TatvamButton className="mt-1 ml-1 mr-1 mb-1 right   btn_primary" name="editRole" onClick={this._addRole}>  Edit Role</TatvamButton> */}
                <TatvamButton className="mt-2 ml-2 mr-2 mb-2 right btn_primary" name="addRole"
                              onClick={this._addRole}> Add Role </TatvamButton>

                {/* {this.state.addRole && */}
                <RoleModal open={this.state.addRole} currentCustomerId={this.props.currentCustomerId}
                           closeModal={this.closeModal} title="Add Role"> </RoleModal>
                {/* } */}

                <Col s={12} className="roleGrid">
                    <RolesList customerId={this.props.currentCustomerId} rolesList={this.state.roles}/>
                </Col>

            </Fragment>
        )
    }
}

export default Roles;