import React, {Component, Fragment} from 'react';
import {Row, Switch} from 'react-materialize';
import {TatvamButton, TatvamCol, TatvamModal, TatvamMultiSelect, TatvamTextBox} from '../../../functionalComponents';
import './roleModal.scss';

class RoleModal extends Component {
    _discard = () => {
        if (this.props.title == "Add Role") {
            this.props.closeModal("addRole");
        } else if (this.props.title == "Edit Role") {
            this.props.closeModal("editRole");
        }
        this.setState({
            applicationMode: "",
            operationList: [],
            reportsList: [],
            role: [],
            roleData: {},
            enabled_operations: [],
            enabled_reports: [],
            status: '',
            multiSelect: [],
            operationListOptions: [],
            reportListOptions: [],
            name:"",
            status:""
        });
    };
    _handleInput = (e) => {
        if (e.target.id == 'customerStatus') {
            const status = e.target.checked ? 'Active' : 'Inactive';
            this.setState({
                isActive: e.target.checked,
                status
            });
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    };
    _handleSave = (e) => {
        e.preventDefault();
        let enabled_operations = [];
        let enabled_reports = [];
        this.state.enabled_operations.map((data) => {
            enabled_operations = [...enabled_operations, data.value];
        });
        this.state.enabled_reports.map((data) => {
            enabled_reports = [...enabled_reports, {page_id: data.value, page_title: data.label}];
        });

        let roleData = {
            name: this.state.name,
            enabled_operations,
            enabled_reports,
            status: this.state.status
        };
        if (this.state.applicationMode === 'CREATE') {
            roleData = {
                ...roleData,
                created_by: '', // logged user name
                created_date: '' // UTC time
            };
            this.props.actions.createRoles(this.props.currentCustomerId, roleData).then((response) => {

                if (response.status == 200) {
                    alert(response.data.message)

                } else {
                    alert(response.data.message)
                }
            })
        } else if (this.state.applicationMode === "EDIT") {
            roleData = {
                ...roleData,
                updated_by: '', // logged user name
                updated_date: '' // UTC time
            };
            this.props.actions.editRoles(this.props.currentCustomerId, roleData).then((response) => {

                if (response.status == 200) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                }
            })

        }
        if (this.props.title === "Add Role") {
            this.props.closeModal("addRole");
        } else if (this.props.title === "Edit Role") {
            this.props.closeModal("editRole");
        }
        this.setState({
            applicationMode: "EDIT",
            operationList: [],
            reportsList: [],
            role: [],
            roleData: {},
            enabled_operations: [],
            enabled_reports: [],
            status: '',
            multiSelect: [],
            operationListOptions: [],
            reportListOptions: []
        })

    };
    _triggerSubmit = (e) => {
        this.refs.submit.click();
    };
    operationsClicked = (optionsList) => {
        this.setState({enabled_operations: optionsList});
    };
    reportClicked = (optionsList) => {
        this.setState({enabled_reports: optionsList});
    };

    constructor(props) {
        super(props);
        this.state = {
            applicationMode: "",
            operationList: [],
            reportsList: [],
            role: [],
            roleData: {},
            enabled_operations: [],
            enabled_reports: [],
            status: '',
            multiSelect: [],
            operationListOptions: [],
            reportListOptions: []
        };
    }

    componentDidMount() {
        this.props.actions.fetchAllReports();
        this.props.actions.fetchAllOperations();
        let enabled_operations = [];
        let enabled_reports = [];
        let operationListOptions = [];
        let reportListOptions = [];

        if (this.props.operationsList) {
            this.props.operationsList.map((data, index) => {
                operationListOptions = [...operationListOptions, {label: data.name, value: data.name}];
            });
        }
        if (this.props.reportsList) {

            this.props.reportsList.map((data, index) => {
                reportListOptions = [...reportListOptions, {label: data.page_title, value: data.page_id}];
            });

        }

        this.setState({
            operationListOptions,
            reportListOptions,
            applicationMode: this.props.title == "Add Role" ? "CREATE" : "EDIT",
    });

        if (this.props.roleData && Object.keys(this.props.roleData).length > 0) {
            this.props.roleData.enabled_operations.map((data, index) => {
                enabled_operations = [...enabled_operations, {label: data, value: data}];
            });

            this.props.roleData.enabled_reports.map((data, index) => {
                enabled_reports = [...enabled_reports, {label: data.page_title, value: data.page_id}];
            });

            this.setState({
                ...this.props.roleData,
                isActive: this.props.userData.status == "Active" ? true : false,
                enabled_operations,
                enabled_reports
            });
        }
    }

    componentWillReceiveProps(props) {
        // let operationList = props.operationsList;
        // let reportsList = props.reportsList;
        let operationListOptions = [];
        let reportListOptions = [];
        props.operationsList.map((data, index) => {
            operationListOptions = [...operationListOptions, {label: data.name, value: data.name}];
        });
        props.reportsList.map((data, index) => {
            reportListOptions = [...reportListOptions, {label: data.page_title, value: data.page_id}];
        });
        this.setState({
            operationListOptions,
            reportListOptions,
            applicationMode: props.title == "Add Role" ? "CREATE" : "EDIT",
        });


        if (props.roleData && Object.keys(props.roleData).length > 0) {
            let enabled_operations = [];
            let enabled_reports = [];
            props.roleData.enabled_operations.map((data, index) => {
                enabled_operations = [...enabled_operations, {label: data, value: data}];
            });

            props.roleData.enabled_reports.map((data, index) => {
                enabled_reports = [...enabled_reports, {label: data.page_title, value: data.page_id}];
            });

            this.setState({
                ...props.roleData,
                isActive: props.roleData.status == "Active" ? true : false,
                enabled_operations,
                enabled_reports
            });

        }
    }

    render() {
        return (
            <TatvamModal
                open={this.props.open}
                header={this.props.title}
                options={{dismissible: false}}
                fixedFooter={false}
                actions={(
                    <Row className="pb-2 pr-2">
                        {/* Display Edit in view mode */}

                        {this.state.applicationMode == " VIEW" && (
                            <TatvamButton
                                className="mt-1 CreateProjectPublish btn_primary "
                                name="EDIT"
                                onClick={this._handleAppMode}
                            >
                                Edit
                            </TatvamButton>
                        )}

                        {/* Display publish in create and edit mode */}

                        {this.state.applicationMode !== 'VIEW' && (
                            <Fragment>
                                <TatvamButton
                                    waves="light"
                                    className="mt-1 CreateProjectPublish btn_primary "
                                    onClick={this._triggerSubmit}
                                    disabled={this.state.name === ''}
                                >
                                    Save
                                </TatvamButton>
                                {/* Display Discard in if project name is not empty */}
                                {this.state.currentProject && this.state.currentProject.projectStatus == 'save' && (
                                    <TatvamButton
                                        className="mt-1 mr-1 CreateProjectPublish btn_primary"
                                        onClick={this.deleteSaved}
                                        disabled={this.state.name === ''}
                                    >
                                        Delete
                                    </TatvamButton>
                                )}
                                <TatvamButton
                                    waves="light"
                                    className="mt-1 mr-1 CreateProjectPublish btn_primary waves"
                                    onClick={this._discard}
                                >
                                    Discard
                                </TatvamButton>
                            </Fragment>
                        )}
                    </Row>
                )}
            >
                <form onSubmit={this._handleSave}>
                    <Row>
                        <TatvamTextBox
                            className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                            s={4}
                            m={4}
                            l={4}
                            xl={4}
                            required
                            label="Name*"
                            name="name"
                            onChange={this._handleInput}
                            value={this.state.name}
                            disabled={!(this.state.applicationMode == 'CREATE')}
                        />

                        <div className="col s4 valign-wrapper">
                            <label htmlFor="status" className="status-label">
                                {' '}
                                Status
                                {' '}
                            </label>
                            <Switch
                                required
                                id="customerStatus"
                                checked={this.state.isActive}
                                onChange={this._handleInput}
                                m={3}
                                disabled={this.state.applicationMode == 'VIEW'}
                            />
                        </div>


                        {/* <TatvamSelect value={this.state.role} label="Select Reports*" name="role" required className={"user-inputs"} onChange={this._handleInput} m={4} disabled={this.state.applicationMode == "VIEW" ? true : false} >
              <option value="" disabled>
                Select Reports
                  </option>
              {this.state.reportsList.map((data, index) => {
                return <option value={data.id}> {data.name} </option>
              })}
          </TatvamSelect>           */}
                    </Row>
                    <Row>
                        <TatvamCol m={6} className="mt-.75">
                            <TatvamMultiSelect
                                classNamePrefix="react-select"
                                value={this.state.enabled_operations}
                                isMulti
                                name="operation"
                                onChange={this.operationsClicked}
                                options={this.state.operationListOptions}
                                isDisabled={this.state.applicationMode == 'VIEW'}
                                placeholder="Select Operations"
                            />
                        </TatvamCol>
                        <TatvamCol m={6} className="mt-.75">
                            <TatvamMultiSelect
                                classNamePrefix="react-select"
                                value={this.state.enabled_reports}
                                isMulti
                                name="report"
                                onChange={this.reportClicked}
                                options={this.state.reportListOptions}
                                isDisabled={this.state.applicationMode == 'VIEW'}
                                placeholder="Select Reports"
                            />
                        </TatvamCol>
                    </Row>
                    <Row>

                    </Row>
                    <button type="submit" ref="submit" className="hide">
                        Submit
                    </button>
                </form>
            </TatvamModal>
        );
    }
}

export default RoleModal;
