import { concat } from 'ramda';

const arrayConcat = (arrays) => {
  let arr = [];
  for (let i = 0; i < arrays.length; i += 1) {
    arr = concat(arr, arrays[i]);
  }
  return arr;
};

export default arrayConcat;
