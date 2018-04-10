import React, {Component} from 'react';
import Authentication from "../utils/Auth.class";

export default class AsideComponent extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Authentication.deauthenticate();
        this.props.doit()
    };

    render(){
    return(
        <aside>
        <small>Angemeldet als</small>
        <big>
            <span className="name">{this.props.name}</span>,
            <span className="class">10c</span>
        </big>
        <button onClick={this.logout}>Abmelden</button>
        </aside>
    )
    }

}