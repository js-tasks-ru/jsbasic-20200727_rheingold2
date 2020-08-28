import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.createMainElements();
    this.swiftArrows(this.elem);
    this.addSlides(slides);
    this.carouselCount=0;
    this.carouselOffset=0;
    this.arrowEvents();
    this.CustomEvent();
  }

  createMainElements(){
    this.elem = document.createElement('div');
    this.elem.className = 'carousel';
    this.carouselInner = document.createElement('div');
    this.carouselInner.className = 'carousel__inner';
    this.elem.append(this.carouselInner);
  }
  renderSlide(slide, carouselInner){
    carouselInner.insertAdjacentHTML('beforeend',` <div class="carousel__slide" data-id="penang-shrimp">
    <img src="/assets/images/carousel/" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€<!--значение slide.price--></span>
      <div class="carousel__title"><!--значение slide.name--></div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div> `)
  }
  swiftArrows(elem){
    elem.insertAdjacentHTML('afterbegin',`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`);
  }
  addSlides(slides){
    slides.forEach( (imgObj, index)=>{ 
      this.renderSlide(imgObj, this.carouselInner);

      let slide = this.carouselInner.querySelectorAll('.carousel__slide');
      let slideImg = slide[index].querySelector('img');
      let imgSrcAttr = slideImg.getAttribute('src');

      slideImg.setAttribute('src',`${imgSrcAttr}${imgObj.image}`);
      slide[index].setAttribute('data-id', imgObj.id);
      slide[index].querySelector('.carousel__price').insertAdjacentText('afterbegin',`${imgObj.price.toFixed(2)}`);
      slide[index].querySelector('.carousel__title').insertAdjacentText('afterbegin',`${imgObj.name}`);

    })
  }
  arrowEvents(){
    let arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let arrowLeft = this.elem.querySelector('.carousel__arrow_left');

    arrowLeft.style.display = 'none';

    arrowRight.addEventListener('click', ()=>{
      this.carouselCount++;
      if(this.carouselCount >= this.slides.length-1){
        arrowRight.style.display='none';
      }
      
      this.carouselOffset -= this.carouselInner.offsetWidth;
      this.carouselInner.style.transform = `translateX(${this.carouselOffset}px)`;
  
     if(arrowLeft.style.display === 'none') {arrowLeft.style.display=''} 
    })

    arrowLeft.addEventListener('click', ()=>{
      this.carouselCount--;
      if(this.carouselCount <= 0){
        arrowLeft.style.display='none';
      }
      
      this.carouselOffset += this.carouselInner.offsetWidth;
      this.carouselInner.style.transform = `translateX(${this.carouselOffset}px)`;
  
     if(arrowRight.style.display === 'none') {arrowRight.style.display=''} 
    })

  }

  CustomEvent(){
    this.elem.addEventListener('click', (event)=>{
      let button = event.target.closest('button');
      if(!button) {return};

      if( button.classList.contains('carousel__button'))  {

        let productId = button.closest('div.carousel__slide').getAttribute('data-id');
        if (!productId){return};

        let productEvent =new CustomEvent("product-add", { detail: productId, ubbles: true });
        document.body.dispatchEvent(productEvent);
      }
      return;
    })
  }
  
}
