import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modal = this._renderModal();
    this._closeButtonEvent();
    this._EscButtonEvent();
  }
  open(){
    document.body.append( this._modal );
    document.body.classList.add( 'is-modal-open' );
  }
  _renderModal(){
    let renderedModal = document.createElement('div');
    renderedModal.className = 'modal';
    renderedModal.insertAdjacentHTML('afterbegin',`
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    `);
    return renderedModal;
  }

  setTitle(title){
    let titleElem = this._modal.querySelector('.modal__title');
    titleElem.innerHTML = title;
  }
  setBody(elem){
    let modalBody = this._modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(elem);
  }
  close(){
    this._modal.remove();
    document.body.classList.remove('is-modal-open');
  }
  _closeButtonEvent(){
    let closeButton = this._modal.querySelector('.modal__close');
    closeButton.addEventListener('click', ()=>(this.close()) );
  }
  _EscButtonEvent(){
    document.body.addEventListener('keydown', (event)=>{
      if(event.code === 'Escape') return this.close();
    })
    return;
  }
}
