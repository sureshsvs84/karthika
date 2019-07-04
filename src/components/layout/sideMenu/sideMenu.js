import React, {Component, Fragment} from 'react';
import {Row} from 'react-materialize';
import {NavLink} from 'react-router-dom';

import './sideMenu.scss';

class SideMenu extends Component {
    toggleMenuBtn = () => {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    };

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: true
        };
    }

    componentDidMount() {
        //Fetch data needed by the component by raising an action
    }

    componentWillUnmount() {
        // 1.check whether changes are compeleted
        // 2.alert the user that unsaved data will be lost if they have any uncompeleted changes
    }

    // __onMenuClick = () => {
    //     this.props.history.push('/live')
    // };

    render() {
        return <Fragment>
            <Row className={this.state.isMenuOpen ? 'sideMenuCollapsed' : 'sideMenuUnCollapsed'}>
                {/* menu icons to open and close */}
                <a className={"menu-toggle"} onClick={this.toggleMenuBtn}>
                    {' '}
                    {this.state.isMenuOpen ? <i className="material-icons left menu pointer">menu</i> :
                        <i className="material-icons right pointer">close</i>}{' '}
                </a>


                {/*<div className={!(this.state.isMenuOpen) ? "customerLogo" : "customerLog collapsed_logo"}>*/}
                    {/*<img src={require("../../../../public/assets/images/default_customer.png")}/>*/}
                    {/*<p className={"text-light"}> Hi, user name </p>*/}
                {/*</div>*/}


                <ul className="left-align sideNav-vertical">


                    <Fragment>

                        <li>
                            {!this.state.isMenuOpen ?
                                <NavLink onClick={this.__onMenuClick} to="/live" data-menuid={1} data-position="right"
                                         data-tooltip={'Live'} key={5} className={'greyBorder '}
                                         activeclassname="activeMenu">
                                    <img src={require("../../../../public/assets/images/menuIcon/live.png")}/>
                                    {!this.state.isMenuOpen && <span> {'Live'} </span>}
                                </NavLink> :
                                <NavLink to={"/live"} className={"greyBorder tooltipped"}
                                         activeClassName={"activeMenu"}>
                                    <img src={require("../../../../public/assets/images/menuIcon/live.png")}/>
                                    <span className={"menu-toolTip"}>Live </span>
                                </NavLink>

                            }
                        </li>
                        <li>
                            {!this.state.isMenuOpen ?
                                <NavLink onClick={this.__onMenuClick} to="/demo" data-menuid={1} data-position="right"
                                         data-tooltip={'Demo'} key={5} className={'greyBorder'}
                                         activeClassName="activeMenu">
                                    <img src={require("../../../../public/assets/images/menuIcon/demo.png")}/>
                                    {!this.state.isMenuOpen && <span> {'Demo'} </span>}
                                </NavLink> :
                                <NavLink to={"/demo"} className={"greyBorder"} activeClassName={"activeMenu"}>
                                    <img src={require("../../../../public/assets/images/menuIcon/demo.png")}/>
                                    <span className={"menu-toolTip"}>Demo </span>
                                </NavLink>
                            }
                        </li>
                        <li>
                            {!this.state.isMenuOpen ?
                                <NavLink onClick={this.__onMenuClick} to="/competitors" data-menuid={1}
                                         data-position="right"
                                         data-tooltip={'Competitor'} key={5} className={'greyBorder'}
                                         activeClassName="activeMenu">
                                    <img src={require("../../../../public/assets/images/menuIcon/competitor.png")}/>
                                    {!this.state.isMenuOpen && <span> {'Competitor'} </span>}
                                </NavLink> :
                                <NavLink to={"/competitors"} className={"greyBorder"} activeClassName={"activeMenu"}>
                                    <img src={require("../../../../public/assets/images/menuIcon/competitor.png")}/>
                                    <span className={"menu-toolTip"}>Competitors </span>
                                </NavLink>


                            }

                        </li>
                        {/* <li>
								{!this.state.isMenuOpen ? <NavLink onClick={this.__onMenuClick} to="/non-controlled" data-menuid={1} data-position="right" data-tooltip={'Non controlled'} key={5} className={'greyBorder'} activeclassname="activeMenu">
									<img src={require("../../../../public/assets/images/menuIcon/competitor.png")}></img>
									{!this.state.isMenuOpen && <span> {'Non Controlled'} </span>}
								</NavLink> :
									<img src={require("../../../../public/assets/images/menuIcon/competitor.png")}></img>
								}

							</li> */}
                        {/* <li className="divider-line" > <div className"divider"></div> </li>

							<li>
								{!this.state.isMenuOpen ? <NavLink onClick={this.__onMenuClick} to="/unpublished" data-menuid={1} data-position="right" data-tooltip={'Unpublished'} key={5} className={'greyBorder'} activeclassname="activeMenu">
									<img src={require("../../../../public/assets/images/menuIcon/competitor.png")}></img>
									{!this.state.isMenuOpen && <span> {'Unpublished'} </span>}
								</NavLink> :
									<img src={require("../../../../public/assets/images/menuIcon/competitor.png")}></img>
								}
							</li> */}

                        <li className="divider-line">
                            <div className="divider"/>
                        </li>

                        <li>
                            {!this.state.isMenuOpen ?
                                <NavLink onClick={this.__onMenuClick} to="/#" data-menuid={1}
                                         data-position="right"
                                         data-tooltip={'Competitor'} key={5} className={'greyBorder'}
                                         activeClassName="activeMenu">
                                    <img src={require("../../../../public/assets/images/menuIcon/sourcemaster.png")}/>
                                    {!this.state.isMenuOpen && <span> {'Masters'} </span>}
                                </NavLink> :
                                <NavLink className={"greyBorder"} to="/#" activeClassName={"activeMenu"}>
                                    <img src={require("../../../../public/assets/images/menuIcon/sourcemaster.png")}/>
                                </NavLink>


                            }
                            <ul className={"sub-menus"}>

                                <li>
                                    {this.state.isMenuOpen ?
                                    <NavLink onClick={this.__onMenuClick} to="/masters" data-menuid={2}
                                             data-position="right"
                                             data-tooltip={'Source Master'} key={7} className={'greyBorder'}
                                             activeClassName="activeMenu">
                                        <img src={require("../../../../public/assets/images//menuIcon/live.png")}/>
                                        {!this.state.isMenuOpen && <span> {'Source Master'} </span>}
                                    </NavLink> :
                                        <NavLink className={"greyBorder"} to="/#" activeClassName={"activeMenu"}>
                                            <img src={require("../../../../public/assets/images//menuIcon/live.png")}/>
                                            <span className={"menu-toolTip"}>Source Master</span>
                                        </NavLink>
                                    }


                                </li>
                                <li>
                                    {this.state.isMenuOpen ?
                                        <NavLink onClick={this.__onMenuClick} to="/masters" data-menuid={2}
                                                 data-position="right"
                                                 data-tooltip={'System Configuration'} key={7} className={'greyBorder'}
                                                 activeClassName="activeMenu">
                                            <img src={require("../../../../public/assets/images//menuIcon/live.png")}/>
                                            {!this.state.isMenuOpen && <span> {' System Configuration'} </span>}
                                        </NavLink> :
                                        <NavLink className={"greyBorder"} to="/#" activeClassName={"activeMenu"}>
                                            <img src={require("../../../../public/assets/images//menuIcon/live.png")}/>
                                            <span className={"menu-toolTip"}>Source Master</span>
                                        </NavLink>
                                    }

                                </li>
                            </ul>
                        </li>

                        <li className="divider-line">
                            <div className="divider"/>
                        </li>

                        <li>{!this.state.isMenuOpen ?
                            <NavLink onClick={this.__onMenuClick} to="/settings" data-menuid={1} data-position="right"
                                     data-tooltip={'Settings'} key={5} className={'greyBorder'}
                                     activeClassName="activeMenu">
                                <img src={require("../../../../public/assets/images/menuIcon/settings.png")}/>

                                {!this.state.isMenuOpen && <span> {'Settings'} </span>}
                            </NavLink> :
                            <NavLink className={"greyBorder"} to="/settings" activeClassName={"activeMenu"}>
                                <img src={require("../../../../public/assets/images/menuIcon/settings.png")}/>
                                <span className={"menu-toolTip"}>Settings </span>

                            </NavLink>


                        }
                        </li>
                        <li>
                            {!this.state.isMenuOpen ?
                                <NavLink onClick={this.__onMenuClick} to="#" data-menuid={1} data-position="right"
                                         data-tooltip={'Logout'} key={5} className={'greyBorder'}
                                         activeClassName="activeMenu">
                                    <img src={require("../../../../public/assets/images/menuIcon/logout.png")}/>
                                    {!this.state.isMenuOpen && <span> {'Logout'} </span>}
                                </NavLink> :
                                <NavLink className={"greyBorder"} to="#" activeClassName={"activeMenu"}>
                                    <img src={require("../../../../public/assets/images/menuIcon/logout.png")}/>
                                    <span className={"menu-toolTip"}>Logout </span>

                                </NavLink>

                            }
                        </li>
                    </Fragment>
                </ul>
            </Row>
            {!this.state.isMenuOpen && <div className="sidenav-overlay" onClick={this.toggleMenuBtn}/>}
        </Fragment>;
    }
}

export default SideMenu;
