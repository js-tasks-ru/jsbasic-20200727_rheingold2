function toggleText() {
  // ваш код...
  document.body.querySelector('.toggle-text-button').addEventListener('click', (event)=>{
    let textElem = document.getElementById('text');
    textElem.hidden = !textElem.hidden
  })
}
