export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this._renderSlider();
    this._createSliderSteps();
    this._prevStep = null; 
    this._sliderThumbEvent();
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
  _sliderThumbEvent(){
    this.elem.addEventListener('click', (event)=>{
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
    })
  }
  _sliderCustomEvent(value){
    let change = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(change);
  }
}
