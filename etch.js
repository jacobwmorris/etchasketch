const generateButton = document.querySelector("#generate");
const gridDiv = document.querySelector(".grid");
const gridPxWidth = 800; //window.getComputedStyle(gridDiv).width
const gridPxHeight = 800;


function colorCell(event) {
    event.target.classList.add("colored");
}

function makeGridCell(cellWidth, cellHeight) {
    let cell = document.createElement("div");
    cell.setAttribute("style", `width: ${cellWidth}px; height: ${cellHeight}px;`);
    cell.classList.add("gridCell");

    cell.addEventListener("mouseenter", colorCell);
    
    return cell;
}

function makeGridRow(width, cellWidth, cellHeight) {
    let row = document.createElement("div");
    row.setAttribute("style", `width: ${width * cellWidth}px; height: ${cellHeight}px;`);
    row.classList.add("gridRow");

    for (let n = 0; n < width; ++n) {
        row.appendChild(makeGridCell(cellWidth, cellHeight));
    }

    return row;
}

function makeGrid(width, height) {
    while (gridDiv.childNodes.length > 0) {
        gridDiv.removeChild(gridDiv.firstChild);
    }

    cellWidth = gridPxWidth / width;
    cellHeight = gridPxHeight / height;

    for (let n = 0; n < height; ++n) {
        gridDiv.appendChild(makeGridRow(width, cellWidth, cellHeight));
    }
}

function generateGrid() {
    let size = Number(prompt("Enter grid size (Max: 100):", "4"));
    if (isNaN(size)) {
        console.log("Warning: Non-number value entered. Defaulting to 4.");
        size = 4;
    }
    if (size < 1) {
        console.log("Warning: Grid size can not be less than 1.");
        size = 1;
    }
    if (size > 100) {
        console.log("Warning: Grid size can not be more than 100");
        size = 100;
    }

    makeGrid(size, size);
}

generateButton.addEventListener("click", generateGrid);
