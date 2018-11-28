import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Dashboard from '../components/Dashboard';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Dashboard/>
      </ErrorBoundary>
    );
  }
}

export default App;
