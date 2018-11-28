import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NumberGrid from '../components/NumberGrid';

configure({ adapter: new Adapter() });

describe('Numbers component test', () => {
  let shallowComponent;
  const defaultProps = {
    items: [9887880, 8686868],
  }
  beforeEach(() => {
    shallowComponent = shallow(<NumberGrid {...defaultProps}/>);
  });

  test('should render once', () => {
    expect(shallowComponent.length).toEqual(1)
  });
});
