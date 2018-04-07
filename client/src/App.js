import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Raven from "raven-js";
import ErrorBoundary from "./ErrorBoundary";

class App extends Component {
    _raven;
    constructor(props) {
        super(props);
        this._raven = Raven.config('https://97d62c4e987249e38d22a12572d42755@sentry.io/1104397').install();
    }
  render() {
    return (
      <ErrorBoundary raven={this._raven}>
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
              </p>
          </div>
      </ErrorBoundary>
    );
  }
}

export default App;
