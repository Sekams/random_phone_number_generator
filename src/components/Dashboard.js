import React, { Component } from 'react';
import NavBar from './NavBar';
import Numbers from './Numbers';
import InputOutput from '../utils/InputOutput';
import { prepend0s } from '../utils/Helpers'
import { ORDERS, NUMBERS } from '../constants/collections';
import { PHONE_NUMBERS_FILE_NAME } from '../constants/strings';

class Dashboard extends Component {
  state = {
    isLoading: true,
    numbers: [],
    total: 10,
    maximum: 0,
    minimum: 0,
    order: ORDERS[0],
  }

  componentDidMount() {
    this.mapNumbers(10);
    this.setLoading(false);
    this.isCancelled = false;
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  setLoading = (isLoading) => {
    if (this.isCancelled) return;
    this.setState({ isLoading })
  }

  setNumbers = (numbers, order = ORDERS[0]) => {
    if (this.isCancelled) return;
    this.setState({
      numbers,
      total: numbers.length,
      maximum: Math.max(...numbers),
      minimum: Math.min(...numbers),
      order
    });
  }

  sortNumbers = async (order) => {
    if (this.isCancelled) return;
    if (order === ORDERS[0]) {
      await NUMBERS.sort((a, b) => {
        return a - b;
      });
    } else if (order === ORDERS[1]) {
      await NUMBERS.sort((a, b) => {
        return b - a;
      });
    }
  }

  setOrder = async (event) => {
    if (this.isCancelled) return;
    const order = event.target.value;
    this.setLoading(true)
    await this.sortNumbers(order);
    this.setNumbers(NUMBERS, order);
    this.setLoading(false);
  }

  clearError = () => {
    if (this.isCancelled) return;
    setTimeout(() => { this.setState({ hasError: null }); }, 3000);
  }

  setTotal = (event) => {
    if (this.isCancelled) return;
    const total = event.target.value;
    if (total > 10000) {
      this.setState({
        hasError: 'Total number should be less than or equal to 10000',
      })
      this.clearError();
    } else {
      this.setState({ total, hasError: null });
    }
  }

  getRandomNumber = () => Math.floor((Math.random() * 999999999) + 0);

  getNewNumber(numberToEvaluate) {
    if (this.isCancelled) return;
    const evaluate = (numberToEvaluate) => {
      return !NUMBERS.includes(numberToEvaluate) ? numberToEvaluate : evaluate(this.getRandomNumber());
    }
    return evaluate(numberToEvaluate);
  }

  mapNumbers = async (total) => {
    if (this.isCancelled) return;
    for (let index = 0; index < total; index++) {
      NUMBERS.push(this.getNewNumber(this.getRandomNumber()))
    }
    await this.sortNumbers(this.state.order);
    this.setNumbers(NUMBERS);
  }

  generateNumbers = async () => {
    if (this.isCancelled) return;
    const { total } = this.state
    this.setLoading(true);
    NUMBERS.length = 0;
    await this.mapNumbers(total);
    this.setLoading(false);
  }

  saveNumbers = async () => {
    if (this.isCancelled) return;
    const { total, maximum, minimum, order } = this.state;
    const output = NUMBERS.map(number => `${prepend0s(number)}\n`);
    output.unshift(
      `TOTAL: ${total}\nMAXIMUM: ${prepend0s(maximum)}\nMINIMUM: ${prepend0s(minimum)}\nORDER: ${order}\n\n`
    );
    InputOutput.createTextFile(PHONE_NUMBERS_FILE_NAME, output);
  }

  render() {
    const { total, maximum, minimum, order, isLoading, numbers, hasError } = this.state
    return (
      <div>
        <NavBar
          generateNumbers={total => this.generateNumbers}
          order={order}
          total={`${total}`}
          maximum={`${maximum}`}
          minimum={`${minimum}`}
          setOrder={event => this.setOrder}
          setTotal={event => this.setTotal}
          saveNumbers={event => this.saveNumbers}
        />
        <Numbers
          numbers={numbers}
          isLoading={isLoading}
          hasError={hasError}
        />
      </div>
    );
  }
}

export default Dashboard;