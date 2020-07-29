/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // ваш код...
  if(!str) return '';
  let firsChar = str[0].toUpperCase();
  return firsChar + str.slice(1);
}
