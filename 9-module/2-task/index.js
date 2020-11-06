import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories); 
    this.stepSlider = new StepSlider({steps:6, value:3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.addEventListeners();
  }

  async render() {
    // ... ваш код
    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.body.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
    
    this.products = await this.productList();
    this.productGrid = new ProductsGrid(this.products);
    let elem = document.body.querySelector('[data-products-grid-holder]');
    elem.innerHTML = '';
    elem.append(this.productGrid.elem);
    this.updateFilter();
    
    return new Promise( res=> res() );
  }
  async productList(){
    try{
      let response = await fetch('products.json');
      if(response.ok){
        return await response.json(); 
      }else{
        throw new Error('упс');
      }
    }catch(err){
      alert('Сервер временно не работает, попробуем поторить запрос через 5 секунд');
      setTimeout( ()=> this.productList(), 5000 );
    }
    
  }

 updateFilter(){
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.selectedItem.innerHTML
    });
  }

  addEventListeners(){
    document.body.addEventListener('product-add', (event)=>{
      let productId = event.detail;
      let product = this.products.find( (item)=>item.id === productId);
      this.cart.addProduct(product);
    })

    document.body.addEventListener('slider-change', (event)=>{
      this.productGrid.updateFilter({
        maxSpiciness: event.detail
      })
    })

    document.body.addEventListener('ribbon-select', (event)=>{
      this.productGrid.updateFilter({
        category: event.detail
      })
    })

    let nutsCheckbox = document.getElementById('nuts-checkbox');

    nutsCheckbox.addEventListener('change', ()=>{
      this.productGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

    vegeterianCheckbox.addEventListener('change', ()=>{
      this.productGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }

}
