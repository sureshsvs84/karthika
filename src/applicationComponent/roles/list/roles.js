import React, {Fragment} from 'react';
import {Row} from 'react-materialize';
import RoleModal from "../../../components/base/roleModel";
import {TatvamGrid} from "../../../functionalComponents";

class RolesGrid extends React.Component {
    __onEditRowClick = (data) => {
        this.setState({
            editRole: true,
            roleData: data
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
            colDef: [{headerName: 'Name', field: 'name'}, {headerName: 'Status', field: 'status'}],
            editRole: false,
            roleData: []
        };
        this.__onEditRowClick = this.__onEditRowClick.bind(this);
        this.__onDeleteRowClick = this.__onDeleteRowClick.bind(this);

    }

    componentDidMount() {
        if (this.props.rolesList) {
            this.setState({roles: this.props.rolesList})
        }
    }

    componentWillReceiveProps(props) {
        if (props.rolesList) {
            this.setState({roles: props.rolesList})
        }
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <TatvamGrid gridData={this.state.roles} colData={this.state.colDef}
                                onRowEdit={this.__onEditRowClick} onRowDelete={this.__onDeleteRowClick}/>
                    {/* {this.state.editRole && */}
                    <RoleModal open={this.state.editRole} currentCustomerId={this.props.customerId}
                               roleData={this.state.roleData} closeModal={this._closeModal}
                               title="Edit Role"> </RoleModal>
                    {/* } */}

                </Row>
            </Fragment>
        )
    }
}

export default RolesGrid;