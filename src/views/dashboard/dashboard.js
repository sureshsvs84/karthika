/* eslint-disable linebreak-style */
import React, {Fragment} from 'react';
import {Col, Preloader, Row, Table} from 'react-materialize';
import CustomCard from '../../components/base/card';
import ListView from '../../components/base/list';
import './dashboard.scss';
import {TatvamButton} from '../../functionalComponents';

class Dashboard extends React.Component {
    handleDashboardBtn = (e) => {
        this.setState({
            customerStatus: e.target.value
        });
    };
    _loaderHandler = (e) => {
        this.setState({
            preloader: e
        });
    };
    handleGridView = () => {
        this.setState({
            viewGrid: !this.state.viewGrid
        });
    };
    _createCustomer = () => {
        this.props.history.push({
            pathname: '/customerdetails',
            state: {
                applicationMode: 'CREATE'
            }
        });
    };
    scrollTop = () => {
        window.scrollTo(0, 0);
    };

    constructor(props) {
        super(props);
        this.state = {
            preloader: true,
            customerStatus: 'active',
            viewGrid: false,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.props.actions.fetchAllCustomers(this.props.category).then((response) => {
            this.setState({
                preloader: false
            });
            if (response && response.status !== 200) {
                if (response.data && response.data.message) {
                    alert(response.data.message)
                }
                else {
                    alert(response.message)
                }
            }

        })
    }

    componentWillReceiveProps() {
        this.setState({
            isLoaded: true
        });
    }

    render() {
        return (
            <div>
                <Row>
                    {this.props.customerList && (
                        <Fragment>
                            <Row
                                className={this.state.isLoaded ? 'card-container' : 'card-container loader-wait'}
                            >
                                <Col
                                    s={12}
                                    className={this.state.preloader ? 'valign-wrapper loader-overlay' : 'hide'}
                                >
                                    <Preloader
                                        className="spinner"
                                        size={"big"}
                                        active={this.state.preloader}
                                    >
                                        {' '}
                                    </Preloader>
                                </Col>
                                <Fragment>
                                    <div className="dashboard-btn mt-1 valign-wrapper">
                                        {/* <Button value="active" onClick={this.handleDashboardBtn}>Active</Button>
                                                            <Button value="inactive" onClick={this.handleDashboardBtn}>Inactive</Button> */}

                                        <TatvamButton className="mt-1 left btn_primary" onClick={this._createCustomer}>
                                            {' '}
                                            <i className="large material-icons"> person_add </i>
                                        </TatvamButton>
                                        {this.state.viewGrid === false && (
                                            <i
                                                className="material-icons pointer right"
                                                title="Grid View"
                                                onClick={this.handleGridView}
                                            >
                                                grid_on
                                            </i>
                                        )}
                                        {this.state.viewGrid === true && (
                                            <i
                                                className="material-icons pointer right"
                                                title="List View"
                                                onClick={this.handleGridView}
                                            >
                                                list
                                            </i>
                                        )}
                                    </div>

                                    {this.state.customerStatus === 'active' && (
                                        <Fragment>
                                            <div className=" row ">{/* <h5>Active Customers </h5> */}</div>
                                            {this.state.viewGrid === true ? (
                                                Object.values(this.props.customerList).map((data, index) => (
                                                    <CustomCard
                                                        customerData={data}
                                                        key={data.id}
                                                        history={this.props.history}
                                                        loaderHandler={this._loaderHandler}
                                                    />
                                                ))

                                            ) : (
                                                <Fragment>
                                                    <div className="row table-style  z-depth-4" ref="tableTop">
                                                        <Table
                                                            className="striped responsive-table centered mt-1  list-view">
                                                            <thead>
                                                            <tr>
                                                                <th className="pl-4"
                                                                    style={{textAlign: 'left'}}>Customer Id
                                                                </th>
                                                                <th style={{textAlign: 'left'}}>Customer Name</th>
                                                                <th style={{textAlign: 'left'}}>Category</th>
                                                                <th style={{textAlign: 'left'}}>Industry</th>
                                                                <th className="pr-2"
                                                                    style={{textAlign: 'left'}}>Status
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="pl-4">
                                                            {Object.values(this.props.customerList).map((data, index) => (
                                                                <ListView
                                                                    tenantId={data.id}
                                                                    customerData={data}
                                                                    key={index}
                                                                    history={this.props.history}
                                                                    loaderHandler={this._loaderHandler}
                                                                />
                                                            ))}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}

                                    {/*Scroll To Top Button*/}
                                    <TatvamButton
                                        className="mt-1 left btn_primary scrollTop"
                                        onClick={this.scrollTop}
                                    >
                                        {' '}
                                        <i className="large material-icons"> arrow_upward </i>
                                    </TatvamButton>

                                    {/* {this.state.customerStatus == "inactive" && <Fragment>
                                                                  <h2>Inactive Customers</h2>
                                                                {this.state.viewGrid == true ?
                                                                        this.props.customerList.map((data, index) => {
                                                                              if (data.status == "Inactive")
                                                                                    return <CustomCard customerData={data} key={data.id} history={this.props.history} loaderHandler={this._loaderHandler} />
                                                                        }) :
                                                                         <Fragment>
                                                                              <div className="row create-project-page z-depth-4">
                                                                                    <Table className="striped responsive-table centered mt-4">
                                                                                          <thead>
                                                                                                <tr>
                                                                                                      <th className="pl-4"style={{ textAlign: 'left'}}>Project Name</th>
                                                                                                      <th>Organization</th>
                                                                                                      <th>Location</th>
                                                                                                </tr>
                                                                                          </thead>
                                                                                          {/* <tbody>
                                                                                                {Object.keys(this.props.projectList).map((i, index) => {
                                                                                                      if (this.props.projectList[i].projectStatus == "save")
                                                                                                            return <ListView tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} projectStatus={this.props.projectList[i].projectStatus} />
                                                                                                })}
                                                                                          </tbody>
                                                                                    </Table>
                                                                              </div>
                                                                        </Fragment>
                                                                  }
                                                            </Fragment> }
                                                       */}
                                </Fragment>
                            </Row>
                        </Fragment>
                    )}
                </Row>
            </div>
        );
    }
}

export default Dashboard;
