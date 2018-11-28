import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorBoundary from '../containers/ErrorBoundary';

configure({ adapter: new Adapter() });

describe('Test ErrorBoundary component with no errors', () => {
  let shallowComponent;
  beforeAll(() => {
    shallowComponent = shallow(
      <ErrorBoundary>
        <div>EBC</div>
      </ErrorBoundary>
    );
  });

  test('should render once', () => {
    expect(shallowComponent.find('div').length).toEqual(1)
  });
});

describe('Test ErrorBoundary component with errors', () => {
  let instance;
  let shallowComponent
  beforeAll(() => {
    jest.spyOn(global.console, 'log');
    shallowComponent = shallow(
      <ErrorBoundary>
        <div>EBC</div>
      </ErrorBoundary>
    );
    instance = shallowComponent.instance();
    instance.componentDidCatch('oh nooos an error', 'error info');
    shallowComponent.update();
  })

  it('should log an error to console', () => {
    expect(global.console.log).toHaveBeenCalledWith('oh nooos an error', 'error info');
  })

  it('should update the state to indicate an error', () => {
    expect(instance.state.hasError).toBeTruthy();
  })

  it('should not render the child component', () => {
    expect(shallowComponent.find('div').length).toBe(0);
  })
})
