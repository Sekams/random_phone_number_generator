import { DEFAULT_STAT } from '../constants/strings';

export const prepend0s = (numberToPrepend) => {
  let numberString = numberToPrepend.toString();
  const numberOfZeros = (9 - numberString.length) + 1;
  return `${DEFAULT_STAT.repeat(numberOfZeros)}${numberString}`
} 

export default {
  prepend0s,
}