import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '../components/Dashboard';
import saveAs from 'file-saver';
import { prepend0s } from '../utils/Helpers'
import { PHONE_NUMBERS_FILE_NAME } from '../constants/strings';

configure({ adapter: new Adapter() });

jest.mock('file-saver');

global.Blob = function (content, options) { return ({ content, options }) };

describe('Test InputOutput util', () => {
  let instance;
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(<Dashboard />);
    instance = shallowComponent.instance();
  });

  test('should save file once', () => {
    const { total, maximum, minimum, order, numbers } = instance.state;
    const output = numbers.map(number => `${prepend0s(number)}\n`);
    output.unshift(
      `TOTAL: ${total}\nMAXIMUM: ${prepend0s(maximum)}\nMINIMUM: ${prepend0s(minimum)}\nORDER: ${order}\n\n`
    );
    instance.saveNumbers();
    expect(saveAs).toHaveBeenCalledWith(
      {
        content: output,
        options: {type: "text/plain;charset=utf-8"}
      },
      PHONE_NUMBERS_FILE_NAME
    )
  });
});
