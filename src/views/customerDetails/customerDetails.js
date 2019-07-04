import React, {Component, Fragment} from 'react';
import {Col, Preloader, Row} from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
import TabsProject from '../../components/tabsProject';
import CustomerForm from "../../components/customerForm";

const localConstant = objectUtil.getlocalizeData();

class CustomerDetails extends Component {
    _handleAppMode = (value) => {
        this.setState({
            applicationMode: value
        })
    };
    setId = (custId) => {
        console.log("infunc" + custId);
        this.setState({
            id: custId
        });
        this.custId = custId;

    };

    constructor(props) {
        super(props);
        this.state = {
            currentCustomer: {},
            customerName: "",
            id: "",
            preloader: false,
            fetched: false,
            applicationMode: "",
            addOrg: false,
            addLoc: false,
            deleteLoc: false,
            deleteOrg: false,
            editLoc: false,
            editOrg: false,
            requiredName: false,
        };
        this.custId = "";
    }

    componentWillMount() {


    }

    componentDidMount() {
        // checking for the id of clicked card and fetching data
        if (this.props.location.state !== undefined) {
            let currentCustomer = this.props.customerList;
            this.props.customerList;
            this.setState({
                currentCustomer,
                ...currentCustomer,
                applicationMode: this.props.location.state.applicationMode
            })
        }
        else {
            this.setState({
                applicationMode: "CREATE"
            })
        }
    }

    componentWillReceiveProps(props) {
        // console.log(this.custId);
        // let custIndex = "";
        // props.customerList.map((data, index) => {
        // 	if (data.id == this.custId) {
        // 		custIndex = index
        // 	}

        // })
        this.setState({
            currentCustomer: props.customerList
        })

    }

    render() {
        return (
            <Fragment>

                <Row className="create-project-page">
                    <Row>
                        <Col s={12}
                             className={this.state.preloader ? "valign-wrapper leftzero loader-overlay-view" : "hide"}>
                            <Preloader className="spinner" size='big' active={this.state.preloader}/>
                        </Col>
                        <CustomerForm applicationMode={this.state.applicationMode}
                                      currentCustomer={this.state.currentCustomer} setId={this.setId}/>
                    </Row>
                    <Row>
                        <Col className="z-depth-4 col-centered mt-3 mb-3 p-0" s={12} m={12} l={12} xl={12}>
                            <TabsProject currentCustomer={this.state.currentCustomer} currentCustomerId={this.state.id}
                                         applicationMode={this.state.applicationMode}/>
                        </Col>
                    </Row>
                </Row>

            </Fragment>
        )
    }
}

export default CustomerDetails;