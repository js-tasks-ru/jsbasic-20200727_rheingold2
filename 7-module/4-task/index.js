export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this._renderSlider();
    this._createSliderSteps();
    this._prevStep = null; 
    this.elem.addEventListener('pointerdown', ()=>{
      this._sliderMove(event)
    });
    this.elem.addEventListener('click', ()=>{
      this._selectClosestStep(event);
    })
  }
  _renderSlider(){
    this.elem.insertAdjacentHTML('afterbegin',`
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps">
      </div>
    `)
  }
  _createSliderSteps(){
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let span = document.createElement('span');
    for(let i=0; i<this.steps; i++){
      sliderSteps.append(span.cloneNode('false'));
    }
    sliderSteps.querySelector('span').className='slider__step-active'
  }

  _closestStep(event){
      let stepsCol = this.elem.querySelector('.slider__steps').querySelectorAll('span');
      let stepsArr = Array.from(stepsCol);
      let distance = null;
      let indexElem = null;

      stepsArr.forEach( (elem, index)=>{ 
        let leftDistance = elem.getBoundingClientRect().left;
        let windowDistance = Math.abs( event.clientX - leftDistance );
        if(distance === null || distance > windowDistance ){
          distance = windowDistance;
          indexElem = index; 
        }
      })
      return {step:stepsArr[indexElem], index: indexElem};

  }

  _sliderMove(event){
    this.elem.classList.add('slider_dragging');
    let slider = document.body.querySelector('.slider');
    let sliderThumb = slider.querySelector('.slider__thumb');
    sliderThumb.ondragstar = ()=> false;
    sliderThumb.style.position = 'absolute';
    sliderThumb.style.zIndex = 10;
    if(event.target === sliderThumb){
      document.documentElement.addEventListener('pointermove', this.sliderMoveAt );
    }
    document.documentElement.addEventListener('pointerup', this._removeEvents)//(event)=>{
      //document.documentElement.removeEventListener('pointermove', this.sliderMoveAt );
      //this._selectClosestStep(event);
      //this.elem.classList.remove('slider_dragging');
    //})
    
  }
  _removeEvents = (event)=>{
    document.documentElement.removeEventListener('pointermove', this.sliderMoveAt );
    this._selectClosestStep(event);
    this.elem.classList.remove('slider_dragging');
    document.documentElement.removeEventListener('pointerup', this._removeEvent );
  }

   sliderMoveAt = (event)=>{
    let slider = document.body.querySelector('.slider');
    let sliderThumb = slider.querySelector('.slider__thumb');
    sliderThumb.style.left = (event.pageX - this.elem.getBoundingClientRect().left) / this.elem.clientWidth * 100+'%';
    if(parseFloat(sliderThumb.style.left) < 0) {sliderThumb.style.left = '0%';}
    if(event.pageX >= this.elem.getBoundingClientRect().right ) {sliderThumb.style.left = '100%';}
    this._sliderThumbProgress(event);
   }

  _sliderThumbProgress(event){
    if(this._prevStep != null){
      this._prevStep.classList.remove('slider__step-active');
    }
    let stepsObj  = this._closestStep(event);
    let step = stepsObj.step;
    let index = stepsObj.index;
    let sliderProgress = this.elem.querySelector('.slider__progress');
    step.className = 'slider__step-active';
    this.elem.querySelector('.slider__value').innerHTML = index;
    sliderProgress.style.width = (event.pageX - this.elem.getBoundingClientRect().left) / this.elem.clientWidth * 100+ '%';
    if ( event.pageX >= this.elem.getBoundingClientRect().right ) sliderProgress.style.width = 100+'%';
    if ( event.pageX <= this.elem.getBoundingClientRect().left ) sliderProgress.style.width = 0+'%';
    this._prevStep = step;

  }
  _selectClosestStep(event){
    if(this._prevStep != null){
      this._prevStep.classList.remove('slider__step-active');
    }
    let stepsObj  = this._closestStep(event);
    let step = stepsObj.step;
    let index = stepsObj.index;
    let sliderPercent = index*100/(this.steps-1);
    step.className = 'slider__step-active';
    this.elem.querySelector('.slider__value').innerHTML = index;
    this.elem.querySelector('.slider__thumb').style.left = sliderPercent + '%';
    this.elem.querySelector('.slider__progress').style.width = sliderPercent + '%';
    this._prevStep = step;
    this._sliderCustomEvent(index);
  }
  _sliderCustomEvent(value){
    let change = new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    });
    this.elem.dispatchEvent(change);
  }
}

