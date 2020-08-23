/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 *
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * 
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.setTh(this.elem);
    this.elem.tBodies[0].insertAdjacentHTML('afterbegin', rows.map( (item)=>{
      return `<tr> 
      <td>${item.name}</td> <td>${item.age}</td> 
      <td>${item.salary}</td> <td>${item.city}</td> 
      </tr>`
    }).join(''));
    this.addButtons(this.elem);
    this.addIvent(this.elem);
  }
  setTh(elem){
    elem.insertAdjacentHTML('afterbegin', `<thead> <tr> <th>Имя</th> 
    <th>Возраст</th> <th>Зарплата</th> <th>Город</th> <th></th> </tr> </thead>
    <tbody> </tbody>`);
  }
  addButtons(elem){
    let newTd = document.createElement('td');
    newTd.innerHTML = `<button data-delete-row='truenpm te'> X </button>`;
    for( let row of elem.tBodies[0].rows){
      row.append(newTd.cloneNode(true));
    }
  }
  addIvent(elem){
    elem.addEventListener('click', (event)=>{
      if(!event.target.dataset.deleteRow) {return};
      let h123 = event.target.closest('tr');
      event.target.closest('tr').remove();
    })
  }
}
