import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Col, Preloader} from 'react-materialize';
import logo from '../../../../public/assets/images/logo/tatvamLogo.png';
import './header.scss';
import {Link} from 'react-router-dom';

class Header extends Component {
    handleClick = e => {
    };

    constructor(props) {
        super(props);
        this.state = {
            isdropDownOpen: false,
            selectedFile: null,
            preloader: false
        };
    }

    render() {
        return (
            <Fragment>
                <Col s={12} className={this.state.preloader ? 'valign-wrapper leftzero loader-overlay-view' : 'hide'}>
                    <Preloader className="spinner" size="big" active={this.state.preloader}/>
                </Col>
                <header id="header" className="page-topbar">
                    <Col className="navbar-fixed">
                        <nav className="navbar-color">
                            <Col className="nav-wrapper d-flex">
								<span className="header-nav">
									<Link to="/live" onClick={this.handleClick} className="pl-2" name="VIEW">
										{' '}
                                        <img src={logo} alt="_logo"/>{' '}
									</Link>
								</span>
                                {this.props.authStatus ? (
                                    <label className="white-text" style={{float: 'right', marginRight: '62px'}}
                                           title="Environment">
                                        {env}
                                    </label>
                                ) : null}
                                <p className="user_name"> Tatvam Admin </p>
                                <Link to="/signout">
                                    {' '}
                                    <i className="material-icons" title="Log out">
                                        exit_to_app
                                    </i>
                                </Link>
                            </Col>
                        </nav>
                    </Col>
                </header>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Header);
