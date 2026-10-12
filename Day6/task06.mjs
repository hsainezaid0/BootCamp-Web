export function arrayFiltering(array, test) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (test(element) === true) {
      result.push(element);
    }
  }

  return result;
}