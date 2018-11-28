import React from 'react';
import logo from '../images/logo.svg';
import downloadIcon from '../images/download.svg'
import PropTypes from 'prop-types'
import { ORDERS } from '../constants/collections';
import { DEFAULT_STAT } from '../constants/strings'
import { prepend0s } from '../utils/Helpers'


const renderOrderOptions = () =>
  ORDERS.map(order => <option key={order} value={order}>{order}</option>);

const NavBar = (props) => {
  const { setTotal, total, maximum, minimum, generateNumbers, setOrder, order, saveNumbers } = props;
  return (
    <nav className="navbar">
      <ul>
        <li>
          <img src={logo} className="nav-logo" alt="logo" />
        </li>
        <li>
          <label>Random Phone Number Generator</label>
        </li>
        <li className="right button" title="Download Numbers" onClick={saveNumbers()}>
          <img src={downloadIcon} className="nav-logo" alt="logo" />
        </li>
        <li className="right">
          <button onClick={generateNumbers()}>
            {total === DEFAULT_STAT ? 'G' : 'Reg'}enerate
            </button>
        </li>
        <li className="right">
          <label>Order</label>
          <select
            value={order}
            onChange={setOrder()}
          >
            {renderOrderOptions()}
          </select>
        </li>
        <li className="right">
          <label>Total:</label>
          <input
            value={total}
            onChange={setTotal()}
            type="number"
            min="1"
            max="10000"
            maxLength="5"
            onBlur={generateNumbers()}
          />
        </li>
        <li className="right">
          <label>Maximum:</label>
          <label>{prepend0s(maximum)}</label>
        </li>
        <li className="right">
          <label>Minimum:</label>
          <label>{prepend0s(minimum)}</label>
        </li>
      </ul>
    </nav>
  )
}

NavBar.defaultProps = {
  order: ORDERS[0],
  total: DEFAULT_STAT,
  maximum: DEFAULT_STAT,
  minimum: DEFAULT_STAT,
  generateNumbers: () => { },
  setOrder: () => { },
  setTotal: () => { },
  saveNumbers: () => { },
};

NavBar.propTypes = {
  order: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  maximum: PropTypes.string.isRequired,
  minimum: PropTypes.string.isRequired,
  generateNumbers: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  setTotal: PropTypes.func.isRequired,
  saveNumbers: PropTypes.func.isRequired,
};

export default NavBar;
