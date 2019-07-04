import React, {Component, Fragment} from 'react';
import {Row, Switch} from 'react-materialize';
import {TatvamButton, TatvamCol, TatvamSelect, TatvamTextBox} from "../../functionalComponents"
import "./customerForm.scss"

class CustomerForm extends Component {
    _handleAppMode = () => {
        this.setState({
            applicationMode: "EDIT"
        })
    };
    _handleSave = () => {
        let customerForm = {};
        customerForm = {
            ...this.state.currentCustomer,
            name: this.state.name,
            id: this.state.id,
            industry: this.state.industry,
            category: this.state.category,
            licence_type: this.state.licence_type,
            status: this.state.status,
            logo: this.state.logo,
        };

        if (this.state.applicationMode == 'CREATE') {
            customerForm = {
                ...customerForm,
                created_by: '', // logged user name
                created_date: '' // UTC time
            };
            this.props.actions.createCustomer(customerForm).then((response) => {

                if (response.status == 200) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                }
            })

        } else if (this.state.applicationMode == "EDIT") {
            customerForm = {
                ...customerForm,
                updated_by: '', // logged user name
                updated_date: '' // UTC time
            };
            this.props.actions.saveCustomer(customerForm).then((response) => {

                if (response.status == 200) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                }
            })
        }
        this.setState({
            applicationMode: "VIEW"
        });

        this.props.setId(this.state.id)

    };
    _handleDiscard = () => {

    };
    _handleInput = (e) => {
        if (e.target.id == "status") {
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
    _triggerImageUpload = (e) => {
        this.refs.logoUpload.click();
    };
    _handleImageUpload = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            // console.log(e.target.result);
            this.setState({logo: e.target.result})
        }
    };
    _showImgEdit = () => {
        this.setState({
            showImgEdit: !this.state.showImgEdit
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            applicationMode: props.applicationMode,
            currentCustomer: props.currentCustomer,
            industryList: [],
            categoryList: [],
            status: props.currentCustomer.status,
            logo: "",
            industry: "",
            category: "",
            licence_type: ""
        };
        this.licenceList = ["Bronze", "silver", "gold", "platinum"]
    }

    componentDidMount() {
        this.props.actions.fetchCategory();
        this.props.actions.fetchIndustry();
        this.setState({
            applicationMode: this.props.applicationMode,
            currentCustomer: this.props.customer,
            ...this.props.customer,
            categoryList: this.props.categoryList,
            industryList: this.props.industryList,
            isActive: this.props.customer && this.props.customer.status === "Active" ? true : false
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            applicationMode: props.applicationMode,
            currentCustomer: props.customer,
            ...props.customer,
            categoryList: props.categoryList,
            industryList: props.industryList,
            isActive: props.customer && props.customer.status === "Active" ? true : false
        })

    }

    render() {
        return (
            <Fragment>
                <TatvamCol className="z-depth-4 centered mt-2" s={12} m={12} l={12} xl={12}>
                    <Row className="project-form">
                        <TatvamCol s={12} m={12} l={12} xl={12} className='project_name mt-1 mb-1'>
                            {this.state.logo == "" ?
                                <TatvamButton className="image-upload " onClick={this._triggerImageUpload}
                                              disabled={this.state.applicationMode == "VIEW" ? true : false}> <input
                                    type="file" ref="logoUpload" onChange={(e) => this._handleImageUpload(e)}
                                    className="hide" accept="image/*"/> </TatvamButton>
                                :

                                <Fragment>
                                    <div className="left d-flex flex-colum">
                                        <img className="image-uploaded " src={this.state.logo}/>
                                        {(this.state.applicationMode == "EDIT" || this.state.applicationMode == "CREATE") &&
                                        <Fragment>
                                            <span className="logo_edit material-icons"
                                                  onClick={this._triggerImageUpload}> mode_edit</span>
                                            <input type="file" ref="logoUpload"
                                                   onChange={(e) => this._handleImageUpload(e)} className="hide"
                                                   accept="image/*"/>
                                        </Fragment>
                                        }
                                    </div>
                                </Fragment>
                            }
                            <TatvamTextBox
                                className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                                s={2} m={2} l={2} xl={2} label="Customer Id*" name="id" required
                                onChange={this._handleInput} value={this.state.id}
                                disabled={this.state.applicationMode == "CREATE" ? false : true}/>
                            <TatvamTextBox
                                className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0 ' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'}
                                s={5} m={5} l={5} xl={5} label="Customer Name*" name="name" required
                                onChange={this._handleInput} value={this.state.name}
                                disabled={this.state.applicationMode == "VIEW" ? true : false}/>

                            <Row className={"pb-2 pr-2"}>
                                {/* Display Edit in view mode */}

                                {this.state.applicationMode == "VIEW" &&
                                <TatvamButton className="mt-1 CreateProjectPublish btn_primary " name="EDIT"
                                              onClick={this._handleAppMode}>Edit</TatvamButton>}

                                {/* Display publish in create and edit mode */}

                                {this.state.applicationMode !== 'VIEW' &&
                                <Fragment>
                                    <TatvamButton waves="light" className="mt-1 CreateProjectPublish btn_primary  "
                                                  onClick={this._handleSave}
                                                  disabled={(this.state.name !== '') ? false : true}>Save</TatvamButton>
                                    {/* Display Discard in if project name is not empty */}
                                    {this.state.currentProject && this.state.currentProject.projectStatus == "save" &&
                                    <TatvamButton className="mt-1 mr-1 CreateProjectPublish btn_primary"
                                                  onClick={this.deleteSaved}
                                                  disabled={(this.state.name !== '') ? false : true}>Delete</TatvamButton>}
                                    {/* {this.state.applicationMode === "CREATE" && <TatvamButton className="mt-1 mr-1 CreateProjectPublish btn_primary" onClick={this.finalSave} disabled={(this.state.name !== '') ? false : true}>{"Save & Close"}</TatvamButton>} */}
                                    <TatvamButton waves="light"
                                                  className="mt-1 mr-1 CreateProjectPublish btn_primary waves"
                                                  onClick={this._discard}>Discard</TatvamButton>
                                </Fragment>
                                }
                            </Row>
                        </TatvamCol>

                        <TatvamCol s={12} className={"valign-wrapper"}>

                            <TatvamSelect value={this.state.industry} label="Industry" name="industry"
                                          className={"user-inputs"} onChange={this._handleInput} m={4}
                                          disabled={this.state.applicationMode == "VIEW" ? true : false}>
                                <option value="" disabled>
                                    Select Industry
                                </option>
                                {this.state.industryList.map((data, index) => {
                                    return <option value={data}> {data} </option>
                                })}
                            </TatvamSelect>


                            <TatvamSelect value={this.state.category} label="Category" name="category"
                                          onChange={this._handleInput} m={3}
                                          disabled={this.state.applicationMode == "VIEW" ? true : false}>
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {this.state.categoryList.map((data, index) => {
                                    return <option value={data}> {data} </option>
                                })}
                            </TatvamSelect>
                            <TatvamCol m={5} className="valign-wrapper">
                                <TatvamSelect value={this.state.licence_type} label="Licence Type" name="licence_type"
                                              className={"user-inputs"} onChange={this._handleInput}
                                              disabled={this.state.applicationMode == "VIEW" ? true : false}>
                                    <option value="" disabled>
                                        Select licence
                                    </option>
                                    {this.licenceList.map((data, index) => {
                                        return <option value={data}> {data} </option>
                                    })}
                                </TatvamSelect>
                                <label htmlFor="status">Status</label>
                                <Switch id="status" checked={this.state.isActive} onChange={this._handleInput} m={3}
                                        disabled={this.state.applicationMode == "VIEW" ? true : false}/>
                            </TatvamCol>
                        </TatvamCol>
                    </Row>
                </TatvamCol>


            </Fragment>
        )
    }
}

export default CustomerForm;