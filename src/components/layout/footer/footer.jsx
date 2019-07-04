import React, {Fragment} from 'react';
import './footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <Fragment>
                <footer className="page-footer">
                    <div className="footer-copyright">
                        <div className="container">
                            <span>©2019 Powered by <a href="https://www.netserv-appl.com/" target="_blank">NetServ Applications</a>, All rights reserved.</span>
                        </div>
                    </div>
                </footer>
            </Fragment>
        )
    }
}

export default Footer; 
