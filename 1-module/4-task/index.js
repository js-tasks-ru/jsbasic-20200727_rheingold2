/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  // ваш код...
  if( str.toLowerCase().indexOf('1xbet') !== -1 || str.toLowerCase().indexOf('xxx') !== -1 ) return true;
  return false;
}
