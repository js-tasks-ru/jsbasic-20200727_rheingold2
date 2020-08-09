/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  // ваш код...
  let NumberArr = str.split(',').join(' ').split(' ').filter( item => !isNaN( parseFloat(item) ) );
  return { min: Math.min(...NumberArr), max: Math.max(...NumberArr) };
}
