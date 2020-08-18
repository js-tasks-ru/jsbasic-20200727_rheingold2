function hideSelf() {
  // ваш код...
  document.addEventListener('click', (event)=>{
    if(event.target.classList.contains('hide-self-button')) event.target.hidden='true';
  })
}
