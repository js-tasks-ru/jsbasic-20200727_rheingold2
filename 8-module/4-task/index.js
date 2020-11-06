import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if(this.cartItems.includes(product)){
      let duplicateItem = this.cartItems.find( (cartProduct)=>{
        return cartProduct.id === product.id;
       });
       duplicateItem.count++;
     }else{
       product.count = 1;
       this.cartItems.push(product);
     }
     this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let productIndex = this.cartItems.findIndex( (obj)=>{
      return obj.id === productId;
    } );
    if(amount > 0){
      this.cartItems[productIndex].count++;
    }
    if(amount<0){
      this.cartItems[productIndex].count--;

      if(this.cartItems[productIndex].count <=0){
        this.cartItems.splice(productIndex,1);
      }
    }
    this.onProductUpdate(this.cartItems, productId||null);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if(this.cartItems.length === 0) {return true;}
    return false;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalProd = 0;
    this.cartItems.forEach( (prod)=>{
        totalProd += prod.count;
    })
    return totalProd;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    this.cartItems.forEach( (prod)=>{
      totalPrice += prod.price * prod.count;
    })
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  selectClosestProduct(eventTarget){

  }
  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.open();
    this.modal.setTitle("Your order");
    this.orderlist = document.createElement('div');
    this.cartItems.forEach(item =>{
      this.orderlist.append( this.renderProduct(item, item.count) );
    })

    this.orderlist.append( this.renderOrderForm() );

    this.modal.setBody(this.orderlist);
    this.orderlist.addEventListener('click', event=>{
      let eventTargetClass = event.target.closest('button');
      if(eventTargetClass === null){ return; }
      if(eventTargetClass.classList.contains('cart-counter__button_minus') ){
        let itemId = event.target.closest('.cart-product').getAttribute('data-product-id');
        this.updateProductCount(itemId, -1);
      }
      if(eventTargetClass.classList.contains('cart-counter__button_plus') ){
        let itemId = event.target.closest('.cart-product').getAttribute('data-product-id');
        this.updateProductCount(itemId, 1);
      }
    })
    let h123 = this.orderlist.querySelector('.cart-form');
    this.orderlist.querySelector('.cart-form').addEventListener('submit', (event)=>this.onSubmit(event));
    //this.onSubmit(event);
  }

  onProductUpdate(cartItem, productId) {
    // ...ваш код
    if(document.body.classList.contains('is-modal-open') ){
      if(cartItem.length<=0) {
        this.modal.close();
        this.cartIcon.update(this);
        return;
      }
      let productItem = cartItem.find( (item)=>{
        return productId === item.id;
      })
      if(productItem === undefined){
        this.orderlist.querySelector( `[data-product-id="${productId}"]` ).remove();
        this.cartIcon.update(this);
        let infoPrice = this.orderlist.querySelector(`.cart-buttons__info-price`);
        infoPrice.innerHTML = `€${ this.getTotalPrice().toFixed(2) }`;
        return;
      }
      let productCount = this.orderlist.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = this.orderlist.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = this.orderlist.querySelector(`.cart-buttons__info-price`);
      productCount.innerHTML = productItem.count;
      productPrice.innerHTML = `€${(productItem.price*productItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${ this.getTotalPrice().toFixed(2) }`;
      
    }

    this.cartIcon.update(this);
  }
  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    let formElem = this.orderlist.querySelector('.cart-form');
    let submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading'); 
    let response = fetch( 'https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(formElem)
    })
    .then( respon =>{
      if(respon.ok){
        this.modal.setTitle('Success!');
        this.cartItems.length = 0;
        this.cartIcon.update(this);
        this.orderlist.innerHTML = `<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`
      }
    });
   
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

