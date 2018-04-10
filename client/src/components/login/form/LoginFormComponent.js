/*******************************************************************************
 * Copyright (c) 2018. LukvonStrom
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

import React, {Component} from 'react';
import loginRequest from "./loginRequest";
export default class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        try {
            loginRequest(this.state.email, this.state.password, this.props.reorderTop);
        } catch (e){
            console.error(e);
        }
    }

    handleInputChange(event) {
        let value = event.target.value;
        let name = event.target.id;

        this.setState({[name]: value});
    }


    render(){
        return(
            <div id="login">
            <form onSubmit={this.handleSubmit}>
                <input id ="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}></input>
                <input id ="password" type="password" placeholder="Passwort" value={this.state.password} onChange={this.handleInputChange}></input>
                <button type="submit">Anmelden</button>
            </form>
            </div>
    );
    }
}