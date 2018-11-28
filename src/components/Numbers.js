import React from 'react';
import Loader from './Loader';
import NumberGrid from './NumberGrid';
import PropTypes from 'prop-types'

const Numbers = (props) => {
  const { isLoading, numbers, hasError } = props;
  return (
    <div>
      <div id="snackbar" className={hasError ? 'show' : ''}>{hasError}</div>
      {isLoading ? <Loader /> : <NumberGrid items={numbers} />}
    </div>
  );
}

Numbers.defaultProps = {
  isLoading: true,
  numbers: [],
};

Numbers.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  numbers: PropTypes.array.isRequired,
};

export default Numbers;
