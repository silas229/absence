import PropTypes from 'prop-types'
import React, {Component} from "react";

export default class ErrorBoundary extends Component {
    static propTypes = {
    raven: PropTypes.any.isRequired,
    children: PropTypes.any
    };

  _raven;
    constructor(props){
        super(props);
        this.state = {error: null};
        this._raven = props.raven;

    }


    componentDidCatch(error, errorInfo) {
        this.setState({error});
        this._raven.captureException(error, {extra: errorInfo});
    }

    render() {
        if(this.state.error){
            return(
                <div className="snap"
                     onClick={() => this._raven.lastEventId() && this._raven.showReportDialog()}>
                    <p>Da lief etwas schief.</p>
                    <p>Die Entwickler wurden zwar benachrichtigt,</p>
                    <p>aber wenn du trotzdem einen Bericht ausfüllen möchtest,</p>
                    <p>Klicke auf den Text.</p>
                </div>
            )
        } else{
            return this.props.children;
        }
    }
}

