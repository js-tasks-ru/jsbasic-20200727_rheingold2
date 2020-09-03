import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._createmainElements();
    this._createArrows();
    this._addNavItems(categories);
    this._addArrowEvents();
    this._scrollEvent();
    this._selectItemEvents();
    this._prevSelectedItem = null;
  }
  _createmainElements(){
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';

    this._navElem = document.createElement('nav');
    this._navElem.className = 'ribbon__inner';
    this.elem.append(this._navElem);

  }
  _createArrows(){
    this._leftArrow = document.createElement('button');
    this._leftArrow.className = 'ribbon__arrow ribbon__arrow_left';
    this._leftArrow.insertAdjacentHTML('afterbegin','<img src="/assets/images/icons/angle-icon.svg" alt="icon">');
    this.elem.prepend(this._leftArrow);

    this._rightArrow = document.createElement('button');
    this._rightArrow.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    this._rightArrow.insertAdjacentHTML('afterbegin','<img src="/assets/images/icons/angle-icon.svg" alt="icon">');
    this.elem.append(this._rightArrow);
  }

  _createNavItem(dataId, name){
    let navItem = document.createElement('a');
    navItem.setAttribute('href','#');
    navItem.setAttribute('data-id', dataId);
    navItem.className = 'ribbon__item';
    navItem.textContent = name;
    return navItem;
  }
  _addNavItems(categories){
    categories.forEach( (objItem)=>{ 
      this._navElem.append( this._createNavItem(objItem.id, objItem.name) )
    })
  }

  _addArrowEvents(){
    this._rightArrow.addEventListener('click', ()=>{
      this._navElem.scrollBy(350,0);
      this._leftArrow.classList.add('ribbon__arrow_visible');
      
      
    });

    this._leftArrow.addEventListener('click', ()=>{
      this._navElem.scrollBy(-350,0);
      this._rightArrow.classList.add('ribbon__arrow_visible');
      
    })
  }
  _scrollEvent(){
    this._navElem.addEventListener('scroll', ()=>{
      let scrollWidth = this._navElem.scrollWidth;
      let scrollLeft = this._navElem.scrollLeft;
      let clientWidth = this._navElem.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if(scrollRight <= 1){
        this._rightArrow.classList.remove('ribbon__arrow_visible');
      }

      this._navElem.addEventListener('scroll', ()=>{
        if(this._navElem.scrollLeft === 0){
          this._leftArrow.classList.remove('ribbon__arrow_visible');
        }
    })
  })
  }
  _selectItemEvents(){
    this._navElem.addEventListener('click', (event)=>{
      if(event.target.classList.contains('ribbon__item')){

        let rebbonEvent = new CustomEvent('ribbon-select', { detail: event.target.getAttribute('data-id'), 
        bubbles: true });
        this.elem.dispatchEvent(rebbonEvent);

        event.preventDefault();

        if(this._prevSelectedItem != null && this._prevSelectedItem != event.target){
          this._prevSelectedItem.classList.remove('ribbon__item_active');
        }

        event.target.classList.add('ribbon__item_active');
        this._prevSelectedItem = event.target;
      }
    })
  }


}
