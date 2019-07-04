import React, {Fragment} from 'react';
import {TatvamCard, TatvamCol} from "../../../functionalComponents";

import './customCard.scss';

class CustomCard extends React.Component {
    _handleCardClick = (e) => {
        this.props.history.push({
            pathname: '/customerdetails',
            state: {
                id: e.currentTarget.id,
                applicationMode: "VIEW"
            }
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            popup: false
        }
    }

    render() {
        return (
            <TatvamCol s={12} m={3} l={3} xl={3} className="tenant-class">
                {/* Removed for Release 1.0  need to enabled later*/}
                {/* <div className={this.props.projectStatus == "save"? "hide" :"hamburger" } onMouseOver={this._handlePop} onMouseOut={this._handlePop}   >
                    <div className={this.state.popup ? "cardMenu" : "cardMenu hide"} >
                        <ul className="collection" id={this.props.id}>
                            <li onClick={this._handleClone} >Clone</li>
                            <li onClick={this._handleExport} >Export</li> </ul>  </div>
                </div> */}
                <TatvamCard id={this.props.customerData.id} onClick={this._handleCardClick}>
                    {this.props.customerList ?
                        <Fragment>
                            <div className={"card-headers valign-wrapper"}>
                                <div className={"customer-logo "}>
                                    <img
                                        src={this.props.customerData.logo ? this.props.customerData.logo : require("../../../../public/assets/images/default_customer.png")}/>
                                    <span
                                        className={this.props.customerData.status === "Active" ? "active-indicator" : "inactive-indicator"}/>
                                </div>
                                <div className={"card-title"}><p> {this.props.customerData.name}</p></div>
                            </div>
                            <p>Id: <span> {this.props.customerData.id} </span></p>
                            <p>Category: <span> {this.props.customerData.category} </span></p>
                            <p>Industry: <span>  {this.props.customerData.industry} </span></p>
                        </Fragment> : null
                    }
                </TatvamCard>
            </TatvamCol>

        )
    }
}

export default CustomCard;