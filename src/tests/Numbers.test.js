import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Numbers from '../components/Numbers';

configure({ adapter: new Adapter() });

describe('Numbers component test', () => {
  let shallowComponent;
  const defaultProps = {
    hasError: true,
  }
  beforeEach(() => {
    shallowComponent = shallow(<Numbers {...defaultProps}/>);
  });

  test('should render once', () => {
    expect(shallowComponent.length).toEqual(1)
  });
});
