import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.createCard(this.elem);
    this.addImgPath(this.elem, product.image);
    this.addPrice(this.elem, product.price)
    this.CustomEvent(this.elem, product.id);
    this.addCardTitle(this.elem, product.name)
  }
  
  createCard(elem){
    elem.className = 'card';
    elem.insertAdjacentHTML('afterbegin',`
      <div class="card__top">
        <img src="/assets/images/products/" class="card__image" alt="product">
         <span class="card__price">€</span>
      </div>
       <div class="card__body">
        <div class="card__title"></div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `)
  }
  addImgPath(elem, path){
    let startPath = elem.querySelector('.card__image').getAttribute('src')
    elem.querySelector('.card__image').setAttribute('src', `${startPath}${path}`)
  }
  addPrice(elem, price){
    let fixedPrice = price.toFixed(2);
    elem.querySelector('.card__price').insertAdjacentText('beforeend',`${fixedPrice}`);
  }
  addCardTitle(elem, title){
    elem.querySelector('.card__title').insertAdjacentText('afterbegin',`${title}`);
  }
  CustomEvent(elem, productId){
    elem.querySelector('.card__button').addEventListener('click', (event)=>{
      let productEvent =new CustomEvent("product-add", { detail: productId, bubbles: true });
      document.body.dispatchEvent(productEvent);
    })
  }
}
