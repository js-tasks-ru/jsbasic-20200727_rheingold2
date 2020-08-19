function initCarousel() {
  // ваш код...
  let arrowRight = document.body.querySelector('.carousel__arrow_right');
  let arrowRLeft = document.body.querySelector('.carousel__arrow_left');
  let carouselInner = document.body.querySelector('.carousel__inner');
  let carouselImg = document.body.querySelectorAll('.carousel__img');
  let carouselCount=0;
  let carouselOffset = 0;

  arrowRLeft.style.display='none';

  arrowRight.addEventListener('click', ()=>{
    carouselCount++;
    if(carouselCount >= carouselImg.length-1){
      arrowRight.style.display='none';
    }
    
    carouselOffset -= carouselImg[carouselCount].offsetWidth;
    carouselInner.style.transform = `translateX(${carouselOffset}px)`;

    if(arrowRLeft.style.display === 'none') {arrowRLeft.style.display=''} 
  })

  arrowRLeft.addEventListener('click', ()=>{
    carouselCount--;
    if(carouselCount <= 0){
      arrowRLeft.style.display='none';
    }
    carouselOffset += carouselImg[carouselCount].offsetWidth;
    carouselInner.style.transform = `translateX(${carouselOffset}px)`;

    if(arrowRight.style.display === 'none') {arrowRight.style.display=''} ;
  })
}
