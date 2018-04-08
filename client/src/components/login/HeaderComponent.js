

import PropTypes from 'prop-types'
import React, {Component} from 'react';
export default class HeaderComponent extends Component{

    static propTypes = {
    logosrc: PropTypes.string,
    schooltitle: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired
  };
    render(){
        return(
        <header>
            <div className=" flex vertical-center">
                <img src={this.props.logosrc} className="logo" alt="Schoollogo" />
                <div className="name">
                    <h3>{this.props.schooltitle}</h3>
                    <h2>{this.props.short}</h2>
                </div>
            </div>
        </header>);
    }
}

