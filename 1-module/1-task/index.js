/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (!n) return 1;

  let result = n;
  for (let i=n; i > 2; i--) {
    result *= i - 1;
  }
  
  return result;
}

