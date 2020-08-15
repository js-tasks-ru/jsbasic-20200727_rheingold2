/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table){
    let dataMark = 0;
    for(let row of table.tBodies[0].rows){
      for(let cell of row.cells ){

        if(cell.dataset.available){ 
          if( cell.dataset.available === 'true' ){ row.classList.add('available'); }
          if( cell.dataset.available === 'false'){row.classList.add('unavailable');}
          dataMark++;
        }

        if( cell.cellIndex == 2 ) {
            if(cell.innerHTML == 'm') {row.classList.add('male')}
            if(cell.innerHTML == 'f') {row.classList.add('female')}
          }
          
        if( cell.cellIndex == 1 && cell.innerHTML < 18 ) {row.style.textDecoration = 'line-through'}
      }
      if(!dataMark) { row.hidden = 'true' };
      dataMark = 0;
    }
  }
