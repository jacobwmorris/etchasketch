const generateButton = document.querySelector("#generate");
const gridDiv = document.querySelector(".grid");
const gridPxWidth = 800; //window.getComputedStyle(gridDiv).width
const gridPxHeight = 800;


function getRand(max) {
    return Math.floor(Math.random() * max);
}

function colorFromRgb(colorRgb) {
    const colorStr = colorRgb.split(",", 3);
    return [parseInt(colorStr[0]), parseInt(colorStr[1]), parseInt(colorStr[2])];
}

function darken(color, darkness) {
    let darknessPercent = 1 - darkness / 10;
    if (darknessPercent < 0) {
        darknessPercent = 0;
    }
    if (darknessPercent > 1) {
        darknessPercent = 1;
    }

    return color.map(value => Math.floor(value * darknessPercent));
}

function colorCell(event) {
    let cell = event.target;

    //If this is the first pass, apply a random color
    if (cell.getAttribute("data-color") === "none") {
        const colorRgb = `${getRand(256)},${getRand(256)},${getRand(256)}`;
        cell.setAttribute("data-color", colorRgb);
        cell.style.backgroundColor = "rgb(" + colorRgb + ")";
        return;
    }

    //If the darkness is already maxed, return
    let darkness = parseInt(cell.getAttribute("data-darkness"));
    if (darkness >= 10)
        return;

    //Increment and apply darkness
    ++darkness;
    const color = colorFromRgb(cell.getAttribute("data-color"));
    const darkenedColor = darken(color, darkness);

    cell.setAttribute("data-darkness", darkness.toString());
    cell.style.backgroundColor = `rgb(${darkenedColor[0]},${darkenedColor[1]},${darkenedColor[2]})`;
    
    return;
}

function makeGridCell(cellWidth, cellHeight) {
    let cell = document.createElement("div");
    cell.setAttribute("style", `width: ${cellWidth}px; height: ${cellHeight}px;`);
    cell.setAttribute("data-color", "none");
    cell.setAttribute("data-darkness", "0");
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
