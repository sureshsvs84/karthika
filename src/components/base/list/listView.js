import React, {Fragment} from 'react';

// import { withRouter } from 'react-router'

class ListView extends React.Component {
    _handleCardClick = (e) => {
        // this.props.actions.routeTo("/viewedit");

        this.props.history.push({
            pathname: '/customerdetails',
            state: {
                id: e.currentTarget.id,
                applicationMode: this.props.projectStatus == "save" ? "CREATE" : "VIEW"
            }
        })
    };
    _handlePop = () => {
        this.setState({
            popup: !this.state.popup
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
            <tr style={{cursor: "pointer"}} id={this.props.customerData.id} onClick={this._handleCardClick}>
                {this.props.customerList ?
                    <Fragment>
                        <td className="pl-4 pointer" style={{textAlign: 'left'}}>{this.props.customerData.id}</td>
                        <td style={{textAlign: "left"}}>
                            <p>{this.props.customerData.name}</p>
                        </td>
                        <td style={{textAlign: 'left'}}>{this.props.customerData.category}</td>
                        <td style={{textAlign: 'left'}}>{this.props.customerData.industry}</td>
                        <td className="pr-2" style={{textAlign: 'left'}}>{this.props.customerData.status}</td>
                    </Fragment>
                    : null}
                {/* {this.props.customerData.status == "Active" && <td id={this.props.customerData.id}>
                    <Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this._handleClone}>Clone</Button>&nbsp;
                    <Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this._handleExport}>Export</Button>
                </td>}  */}
            </tr>

        )
    }
}

export default ListView;