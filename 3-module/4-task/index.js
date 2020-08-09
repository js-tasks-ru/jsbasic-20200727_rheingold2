/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  // ваш код...
  users = users.filter( (item) => item['age'] <= age );
  return users.map( item => {
    return `${item['name']}, ${item['balance']}`; 
  }).join('\n');
}
