import React, {Component} from 'react';
export default class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit.bind(this);
    }

    handleSubmit(){

    }



    render(){
        return(
            <div id="login">
            <form onSubmit={this.handleSubmit}>
                <input id ="email" type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({[e.target.name]: e.target.value})}></input>
                <input id ="password" type="password" placeholder="Passwort" value={this.state.password} onChange={(e) => this.setState({[e.target.name]: e.target.value})}></input>
                <button type="submit">Anmelden</button>
            </form>
            </div>
    );
    }
}