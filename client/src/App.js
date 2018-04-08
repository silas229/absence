import React, { Component } from 'react';
import './App.css';
import * as Raven from "raven-js";
import ErrorBoundary from "./ErrorBoundary";
import HeaderComponent from "./components/login/HeaderComponent";
import FormComponent from "./components/login/FormComponent";
import AbsenceComponent from "./components/absence/AbsenceComponent";
import NavComponent from "./components/NavComponent";
import FooterComponent from "./components/FooterComponent";
import AsideComponent from "./components/AsideComponent";
import LoginContextComponent from "./components/login/LoginContextComponent";
import util from "./utils/util";

class App extends Component {
    _raven;
    constructor(props) {
        super(props);
        this._raven = Raven.config('https://97d62c4e987249e38d22a12572d42755@sentry.io/1104397').install();
        this.state =  {
            loggedin: util.getAllURLParams().login,
        }
    }



  render() {
    return (
      <ErrorBoundary raven={this._raven}>
          <HeaderComponent logosrc="https://intranet.planschule-it.de/GymRut/Format/GymRut.jpg" schooltitle="Gymnasium" short="Rutesheim"/>
          {this.state.loggedin && <NavComponent />}
          {!this.state.loggedin && <FormComponent/>}
          {this.state.loggedin && <AbsenceComponent />}
          {!this.state.loggedin && <LoginContextComponent />}
          <FooterComponent/>
          {this.state.loggedin && <AsideComponent />}
      </ErrorBoundary>
    );
  }
}

export default App;
