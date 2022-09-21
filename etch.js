const generateButton = document.querySelector("#generate");
const gridDiv = document.querySelector(".grid");

function colorCell(event) {
    event.target.classList.add("colored");
}

function makeGridCell() {
    let cell = document.createElement("div");
    let width = 200;
    let height = 200;
    cell.setAttribute("style", `width: ${width}px; height: ${height}px;`);
    cell.classList.add("gridCell");

    cell.addEventListener("mouseenter", colorCell);
    
    return cell;
}

function makeGridRow() {
    let row = document.createElement("div");
    let width = 800;
    let height = 200;
    row.setAttribute("style", `width: ${width}px; height: ${height}px;`);
    row.classList.add("gridRow");

    let cells = 4;
    for (let n = 0; n < cells; ++n) {
        row.appendChild(makeGridCell());
    }

    return row;
}

function makeGrid() {
    while (gridDiv.childNodes.length > 0) {
        gridDiv.removeChild(gridDiv.firstChild);
    }

    let rows = 4;
    for (let n = 0; n < rows; ++n) {
        gridDiv.appendChild(makeGridRow());
    }
}

generateButton.addEventListener("click", makeGrid);
