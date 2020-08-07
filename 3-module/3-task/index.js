/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  // ваш код...
  return str.split('-').map( (element, index) => {
    if(!index) {return element;}
    return element = element[0].toUpperCase() + element.slice(1);
  }).join('');
}
