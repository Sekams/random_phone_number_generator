import React, { Component } from 'react';
import logo from '../images/logo.svg';
import PropTypes from 'prop-types'

class NavBar extends Component {
  render() {
    const { total, maximum, minimum } = this.props;
    return (
      <nav>
        <ul>
          <li>
            <img src={logo} className="nav-logo" alt="logo" />
          </li>
          <li>
            <label>Random Phone Number Generator</label>
          </li>
          <li className="right">
            <button>Generate</button>
          </li>
          <li className="right">
            <label>Order</label>
            <select>
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </li>
          <li className="right">
            <label>Total:</label>
            <label>{total}</label>
          </li>
          <li className="right">
            <label>Maximum:</label>
            <label>{maximum}</label>
          </li>
          <li className="right">
            <label>Minimum:</label>
            <label>{minimum}</label>
          </li>
        </ul>
      </nav>
    )
  }
}

NavBar.defaultProps = {
  total: '10000',
  maximum: '0999999999',
  minimum: '0000000000',
  generateNumbers: () => { },
  setOrder: () => { },
};

NavBar.propTypes = {
  total: PropTypes.string.isRequired,
  maximum: PropTypes.string.isRequired,
  minimum: PropTypes.string.isRequired,
  generateNumbers: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default NavBar;