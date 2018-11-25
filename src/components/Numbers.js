import React from 'react';
import Loader from './Loader';
import NumberGrid from './NumberGrid';

const Numbers = (props) => {
  const { isLoading } = props;
  return (
    <div>
      {isLoading ? <Loader /> : <NumberGrid />}
    </div>
  );
}

export default Numbers;
