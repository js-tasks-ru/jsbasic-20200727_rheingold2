/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

export default function promiseClick(button) {
  // ваш код...
  return new Promise( (res)=>{
    button.addEventListener('click', (event)=>res(event), {once:true} );
  })
}
