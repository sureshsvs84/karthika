import React, {Component, Fragment} from "react";
import {Row, Switch} from 'react-materialize';
import {TatvamButton, TatvamCol, TatvamModal, TatvamMultiSelect, TatvamTextBox} from "../../../functionalComponents";
import "./roleModal.scss"

class FormModal extends Component {
    _discard = () => {
        if (this.props.title == "Add User") {
            this.props.closeModal("addUser");
        } else if (this.props.title == "Edit User") {
            this.props.closeModal("editUser")
        }
        this.setState({
            applicationMode: "",
            rolesList: [],
            rolesListOptions: [],
            role: [],
            CustomerUserData: {},
            isPasswordMatch: true
        });
    };
    _handleInput = (e) => {
        if (e.target.id == "customerStatus") {
            let status = e.target.checked ? "Active" : "Inactive";
            this.setState({
                isActive: e.target.checked,
                status
            })
        }

        this.setState({
            [e.target.name]: e.target.value
        })
    };
    _handleSave = (e) => {
        e.preventDefault();
        let userTabData;
        if (this.state.password === this.state.confirm_password) {
            userTabData = {
                ...this.state.CustomerUserData,
                id: this.state.user_name,
                user_name: this.state.user_name,
                email: this.state.email,
                // first_name: this.state.first_name,
                // last_name: this.state.last_name,
                display_name: this.state.display_name,
                authentication: {
                    password: this.state.password,
                },
                status: this.state.status,
            };

            if (this.state.applicationMode == "EDIT") {
                let updated_date;
                userTabData = {
                    ...userTabData,
                    updated_by: "",
                    updated_date: "",
                };
                this.props.actions.editUsers(this.props.customerId, userTabData).then((response) => {

                        if (response.status == 200) {
                            alert(response.data.message)
                        } else {
                            alert(response.data.message)
                        }
                        this.forceUpdate();
                    }
                )

            } else if (this.state.applicationMode == "CREATE") {

                let created_date;
                userTabData = {
                    ...userTabData,
                    created_by: "",
                    created_date: "",
                };
                this.props.actions.createUsers(this.props.customerId, userTabData).then((response) => {

                    if (response.status == 200) {
                        alert(response.data.message)
                    } else {
                        alert(response.data.message)
                    }
                })
            }

            if (this.props.title == "Add User") {
                this.props.closeModal("addUser");
            } else if (this.props.title == "Edit User") {
                this.props.closeModal("editUser")
            } this.setState({
                applicationMode: "EDIT",
                rolesList: [],
                rolesListOptions: [],
                role: [],
                CustomerUserData: {},
                isPasswordMatch: true
            });
        } else {
            this.setState({
                isPasswordMatch: false
            })
        }
    };
    _triggerSubmit = (e) => {

        this.refs.submit.click();
    };
    constructor(props) {
        super(props);
        this.state = {
            applicationMode: "",
            rolesList: [],
            rolesListOptions: [],
            role: [],
            CustomerUserData: {},
            isPasswordMatch: true
        }
    }

    componentDidMount() {
        let rolesListOptions = [];


        if (this.props.rolesList) {
            this.props.rolesList.map((data, index) => {
                rolesListOptions = [...rolesListOptions, {label: data.name, value: data.name}];
            });

            this.setState({
                applicationMode: this.props.title == "Add User" ? "CREATE" : "EDIT",
                rolesListOptions
            });

            if (this.props.userData) {
                this.setState({
                    ...this.props.userData,
                    password: this.props.userData.authentication && this.props.userData.authentication.password,
                    isActive: this.props.userData.status == "Active" ? true : false,
                    confirm_password: this.props.userData.authentication && this.props.userData.authentication.password
                })
            }
        }
    }

    componentWillReceiveProps(props){
        let rolesListOptions = [];
        this.setState({
            applicationMode: props.title == "Add User" ? "CREATE" : "EDIT",
        });
        if (this.props.rolesList) {
            this.props.rolesList.map((data, index) => {
                rolesListOptions = [...rolesListOptions, {label: data.name, value: data.name}];
            });
        }
        this.setState({
            rolesListOptions

        });

        if (props.userData) {
            this.setState({
                ...props.userData,
                password: props.userData.authentication && props.userData.authentication.password,
                isActive: props.userData.status == "Active" ? true : false,
                roleList: this.props.rolelist,
                confirm_password: this.props.userData.authentication && this.props.userData.authentication.password
            })
        }
        }
        render() {
        return (
            <TatvamModal open={this.props.open}
                         header={this.props.title}
                         options={{dismissible: false}}
                         fixedFooter={false}
                         actions={
                             <Row className={"pb-2 pr-2"}>
                                 {/* Display Edit in view mode */}

                                 {this.state.applicationMode == "VIEW" &&
                                 <TatvamButton className="mt-1 CreateProjectPublish btn_primary " name="EDIT"
                                               onClick={this._handleAppMode}>Edit</TatvamButton>}

                                 {/* Display publish in create and edit mode */}

                                 {this.state.applicationMode !== 'VIEW' &&
                                 <Fragment>
                                     <TatvamButton waves="light" className="mt-1 CreateProjectPublish btn_primary "
                                                   onClick={this._triggerSubmit}
                                                   disabled={(this.state.name !== '') ? false : true}>Save</TatvamButton>
                                     {/* Display Discard in if project name is not empty */}
                                     {this.state.currentProject && this.state.currentProject.projectStatus == "save" &&
                                     <TatvamButton className="mt-1 mr-1 CreateProjectPublish btn_primary"
                                                   onClick={this.deleteSaved}
                                                   disabled={(this.state.name !== '') ? false : true}>Delete</TatvamButton>}
                                     <TatvamButton waves="light"
                                                   className="mt-1 mr-1 CreateProjectPublish btn_primary waves"
                                                   onClick={this._discard}>Discard</TatvamButton>
                                 </Fragment>
                                 }

                             </Row>
                         }
            >
                <form onSubmit={this._handleSave}>
                    <Row>
                        <TatvamTextBox
                            className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                            s={4} m={4} l={4} xl={4} required
                            label="User Name*" name="user_name" onChange={this._handleInput}
                            value={this.state.user_name}
                            disabled={!(this.state.applicationMode == "CREATE")}/>

                        <TatvamTextBox
                            className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                            s={4} m={4} l={4} xl={4} password required
                            label="Password*" name="password" onChange={this._handleInput} value={this.state.password}
                            disabled={this.state.applicationMode == "VIEW" ? true : false}/>

                        <TatvamTextBox
                            className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                            s={4} m={4} l={4} xl={4} password required
                            label="Confirm Password*" name="confirm_password" onChange={this._handleInput}
                            value={this.state.confirm_password}
                            disabled={this.state.applicationMode == "VIEW" ? true : false}>
                            {!(this.state.isPasswordMatch) &&
                            <p className={"validation_error_text"}>password does not match</p>} </TatvamTextBox>
                    </Row>
                    <Row>
                        {/*
            <TatvamTextBox
              className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
              s={4} m={4} l={4} xl={4} required
              label="First Name" name="first_name" onChange={this._handleInput} value={this.state.name}
              disabled={this.state.applicationMode == "VIEW" ? true : false} />

            <TatvamTextBox
              className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
              s={4} m={4} l={4} xl={4} required
              label="Last Name" name="last_name" onChange={this._handleInput} value={this.state.name}
              disabled={this.state.applicationMode == "VIEW" ? true : false} /> */}


                        <TatvamTextBox
                            className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                            s={4} m={4} l={4} xl={4}
                            label="Display Name" name="display_name" onChange={this._handleInput}
                            value={this.state.display_name}
                            disabled={this.state.applicationMode == "VIEW" ? true : false}/>


                        <TatvamTextBox
                            className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                            s={4} m={4} l={4} xl={4} email validate
                            label="Email" name="email" onChange={this._handleInput} value={this.state.email}
                            disabled={this.state.applicationMode == "VIEW" ? true : false}/>

                        <TatvamCol m={4} className="mt-.75">
                            <TatvamMultiSelect
                                classNamePrefix="role-select"
                                value={this.state.selectedRoles}
                                name="role"
                                onChange={this.reportClicked}
                                options={this.state.rolesListOptions}
                                isDisabled={this.state.applicationMode == 'VIEW'}
                                placeholder="Select Role*"
                            />
                        </TatvamCol>


                    </Row>
                    <Row>

                        <div className="col s4 valign-wrapper">
                            <label htmlFor="status" className="status-label"> Status </label>
                            <Switch required id="customerStatus" checked={this.state.isActive}
                                    onChange={this._handleInput} m={3}
                                    disabled={this.state.applicationMode == "VIEW" ? true : false}/>
                        </div>


                    </Row>
                    <button type="submit" ref="submit" className="hide">Submit</button>
                </form>
            </TatvamModal>


        )
    }
}

export default FormModal;
