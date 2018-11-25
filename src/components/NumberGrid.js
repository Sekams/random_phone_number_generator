import React from 'react';

const renderGridItems = (items) => (
  items.map(item => (
    <div className="grid-item">{item}</div>
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

export default NumberGrid;
