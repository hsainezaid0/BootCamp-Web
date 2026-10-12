export function fizzBuzz(num) {
  const output = [];

  for (let number = 1; number <= num; number++) {
    if (number % 3 === 0 && number % 5 === 0) {
      output.push("FizzBuzz");
    } else if (number % 3 === 0) {
      output.push("Fizz");
    } else if (number % 5 === 0) {
      output.push("Buzz");
    } else {
      output.push(number);
    }
  }

  console.log(output.join(", "));
}
fizzBuzz(5)