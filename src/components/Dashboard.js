import React, { Component } from 'react';
import NavBar from './NavBar';
import Numbers from './Numbers';

class Dashboard extends Component {
  state = {
    isLoading: true,
    numbers: [],
  }
  setLoading = (isLoading) => { this.setState({ isLoading }) }
  generateNumbers = () => {

  }
  render() {
    return (
      <div>
        <NavBar
          generateNumbers={this.generateNumbers}
        />
        <Numbers
          numbers={this.state.numbers}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default Dashboard;