import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../components/NavBar';

configure({ adapter: new Adapter() });

describe('Numbers component test', () => {
  let shallowComponent;
  const defaultProps = {
    total: '0',
  }
  beforeEach(() => {
    shallowComponent = shallow(<NavBar {...defaultProps}/>);
  });

  test('should render once', () => {
    expect(shallowComponent.length).toEqual(1)
  });
});
