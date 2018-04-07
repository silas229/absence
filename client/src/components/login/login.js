import React, {Component} from 'react';
import Auth from "../../utils/Auth.class";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }

    login = async () => {
        await Auth.authenticate();
        this.setState({redirectToReferrer: true});
    }
}