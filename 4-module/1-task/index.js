/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  // ваш код...
  let ulList = document.createElement('ul');
  let liElement = document.createElement('li');

  for (let key of friends){
    let listElem = liElement.cloneNode(false);
    listElem.innerHTML = `${key['firstName']} ${key['lastName']}`;
    ulList.append(listElem);
  }
  return ulList;
}
