import React from 'react';
import PropTypes from 'prop-types'
import { prepend0s } from '../utils/Helpers'

const renderGridItems = (items) => (
  items.map(item => (
    <div key={item} className="grid-item">{prepend0s(item)}</div>
  ))
)

const NumberGrid = (props) => {
  const { items } = props;
    return (
      <div className="grid-container">
        {renderGridItems(items)}
      </div>
    );
}

NumberGrid.defaultProps = {
  items: [],
};

NumberGrid.propTypes = {
  items: PropTypes.array.isRequired,
};

export default NumberGrid;
