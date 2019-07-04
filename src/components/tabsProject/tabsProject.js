import React, {Component} from 'react';
import {Input, Row} from 'react-materialize';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {AlertRules, Competitors, CustSource, Dimensions, ReportSub, Roles, UserLog, Users} from './tabs'

let roles;

class TabsProject extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row className='m-0'>
                <Tabs>
                    <TabList className="tabs customTabs z-depth-1 tabs-fixed-width">
                        <Tab className="tab">Source </Tab>
                        <Tab className="tab"> Roles</Tab>
                        <Tab className="tab"> Users</Tab>
                        <Tab className="tab"> Alert rules</Tab>
                        <Tab className="tab"> Report Subscription</Tab>
                        <Tab className="tab"> Competitors</Tab>
                        <Tab className="tab"> Dimensions </Tab>
                        <Tab className="tab"> Usage Log</Tab>

                    </TabList>

                    <TabPanel>
                        <CustSource applicationMode={this.props.applicationMode}/>
                    </TabPanel>

                    <TabPanel>
                        <Roles currentCustomerId={this.props.currentCustomerId}
                               applicationMode={this.props.applicationMode}/>
                    </TabPanel>

                    <TabPanel>
                        <Users currentCustomerId={this.props.currentCustomerId}
                               applicationMode={this.props.applicationMode}/>
                    </TabPanel>

                    <TabPanel>
                        <AlertRules/>
                    </TabPanel>

                    <TabPanel>
                        <ReportSub/>
                    </TabPanel>


                    <TabPanel>
                        <Competitors/>
                    </TabPanel>

                    <TabPanel>
                        <Dimensions/>
                    </TabPanel>

                    <TabPanel>
                        <UserLog/>
                    </TabPanel>

                </Tabs>
            </Row>
        )
    }
}

export default TabsProject;
