import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }
  fixedCard(){
    let container = document.body.querySelector('.container');
    this.elem.style.position = 'fixed';
    this.elem.style.top = 50 +'px';
    this.elem.style.left = container.getBoundingClientRect().right+ 20 +'px';
  }
  leftSpace(){
    let container = document.body.querySelector('.container');
    if(document.documentElement.getBoundingClientRect().right === this.elem.getBoundingClientRect().right) return;
    let rightSpace = document.documentElement.getBoundingClientRect().right-this.elem.getBoundingClientRect().right;
    if(rightSpace <=10){
      this.elem.style.left = ''; 
      this.elem.style.left = document.documentElement.clientWidth - this.elem.offsetWidth - 10+'px';
    }else{
      this.elem.style.left = container.getBoundingClientRect().right+ 20 +'px';
    }
  }
  absoluteCard(){
      this.elem.style.position = 'absolute';
      this.elem.style.left = '';
      this.elem.style.right = '0px';
  }
  updatePosition() {
    // ваш код ...
    if(!this.elem.offsetHeight && !this.elem.offsetHeight) {return;}
    if(this.elem.getBoundingClientRect().top <= 0){
      this.fixedCard();
    }
    this.leftSpace();
    let headerLogo = document.body.querySelector('.heading');
    if(headerLogo.getBoundingClientRect().top >= 0 || document.documentElement.clientWidth <= 767){
      this.absoluteCard();
    }

  }
}
