export function range(start, end, step) {
  if (step === undefined) {
    if (start < end) {
      step = 1;
    } else {
      step = -1;
    }
  }

  if (step === 0) {
    throw new RangeError("step must be diff to  zero");
  }

  const result = [];

  if (step > 0) {
    for (let nbr = start; nbr <= end; nbr += step) {
      result.push(nbr);
    }
  } else {
    for (let nbr = start; nbr >= end; nbr += step) {
      result.push(nbr);
    }
  }

  return result;
}