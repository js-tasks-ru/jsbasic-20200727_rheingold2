/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    let tableRows = table.rows;
    offset = 0;
    for(let row of tableRows){
        row.cells[offset++].style.backgroundColor='red';
    }
}
