import React, {Component, Fragment} from 'react';
import {Input} from 'react-materialize';

class Competitors extends Component {
    componentDidMount() {
        //Fetch data needed by the component by raising an action
    }

    componentWillUnmount() {
        // 1.check whether changes are compeleted 
        // 2.alert the user that unsaved data will be lost if they have any uncompeleted changes
    }

    render() {
        return (
            <Fragment>
                Competitors To be implemented
            </Fragment>
        )
    }
}

export default Competitors;