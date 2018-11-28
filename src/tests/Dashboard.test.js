import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '../components/Dashboard';
import InputOutput from '../utils/InputOutput';

configure({ adapter: new Adapter() });

jest.mock('../utils/InputOutput');
jest.useFakeTimers();

describe('Test Dashboard component', () => {
  let instance;
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(<Dashboard />);
    instance = shallowComponent.instance();
  });

  test('should render once', () => {
    expect(shallowComponent.length).toEqual(1);
  });

  test('should not set order if doesnt exist', () => {
    instance.sortNumbers('order');
    expect(Math.min(...instance.state.numbers)).toEqual(instance.state.numbers[0]);
    instance.isCancelled = true;
    instance.sortNumbers('Descending');
    instance.setOrder({});
    expect(Math.min(...instance.state.numbers)).toEqual(instance.state.numbers[0]);
  });

  test('should not return anything once cancelled', async () => {
    instance.isCancelled = true;
    expect(instance.getNewNumber(123)).toEqual(undefined);
    expect(await instance.mapNumbers(10)).toEqual(undefined);
    expect(await instance.generateNumbers()).toEqual(undefined);
  });

  test('should call generateNumbers', async () => {
    await instance.generateNumbers();
    expect(instance.state.isLoading).toBe(false);
  });

  test('should not call setLoading if cancelled', () => {
    instance.isCancelled = true;
    instance.setLoading(true);
    expect(instance.state.isLoading).toBe(false);
  });

  test('should call setOrder', async () => {
    expect(instance.state.order).toBe('Ascending');
    const event = {
      target: {
        value: 'Descending',
      }
    }
    await instance.setOrder(event);
    expect(instance.state.order).toBe('Descending');
  });

  test('should set valid total', () => {
    const event = {
      target: {
        value: 20,
      }
    }
    instance.setTotal(event);
    expect(instance.state.total).toBe(20);
    instance.isCancelled = true;
    event.target.value = 25;
    instance.setTotal(event);
    expect(instance.state.total).toBe(20);
  });

  test('should not set invalid total', async () => {
    const event = {
      target: {
        value: 20000,
      }
    }
    await instance.setTotal(event);
    expect(instance.state.hasError).toBe('Total number should be less than or equal to 10000');
    instance.isCancelled = true;
    instance.clearError();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });

  test('should download phone numbers', async () => {
    await instance.saveNumbers();
    expect(InputOutput.createTextFile).toHaveBeenCalled()
  });

  test('should not download phone numbers', () => {
    instance.isCancelled = true;
    instance.saveNumbers();
    expect(instance.state.isLoading).toBe(false)
  });
});