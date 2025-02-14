function generateDivGrid(n) {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            let item = document.createElement("div");
            item.className = "item";
            item.style.flexBasis = `calc(100% / ${n})`;
            item.style.opacity = 1;
            item.addEventListener("mouseover", curEvent);
            GRID.appendChild(item);
        }
    }
}

function getOrderOfMatrix() {
    let n;
    do {
        n = prompt("Enter the n (order of matrix):");
    } while (!isMatrixOrderValid(n));

    return parseInt(n);
}

function isMatrixOrderValid(n) {
    return Number(n) && n > 0 && n <= 100 ? true : false;
}

function regenerateDivGrid() {
    removeDivs();
    generateDivGrid(getOrderOfMatrix());
}

function removeDivs() {
    while (GRID.hasChildNodes()) {
        GRID.removeChild(GRID.firstChild);
    }
}

function clearDivGrid() {
    for (const child of GRID.children) {
        child.style.backgroundColor = "#eeeeee"
        child.style.opacity = 1;
    }
}

function removeEvents(event) {
    for (const child of GRID.children) {
        child.removeEventListener("mouseover", event);
    }
}

function addEvents(event) {
    for (const child of GRID.children) {
        child.addEventListener("mouseover", event)
    }
}

function updateEvents(event) {
    removeEvents(curEvent);
    curEvent = event;
    addEvents(curEvent);
}

function solidPaint(event) {
    curEvent = solidPaint;
    event.target.style.backgroundColor = curColor;
}

function rgbPaint(event) {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    event.currentTarget.style.backgroundColor = "#" + randomColor;
}

function darkerPaint(event) {
    if (event.target.style.opacity >= 0.1 * 2) {
        event.target.style.opacity -= 0.1;
    }
}

let colorPallette = document.querySelector("#color-dialog");

const GRID = document.querySelector(".square-container");
let curEvent = solidPaint;
let curColor = colorPallette.value;
let isDarkerModeOn = false;

colorPallette.addEventListener("change", (event) => {
    curColor = event.target.value;
    updateEvents(solidPaint);
})

document.querySelector(".regenerate").addEventListener("click", regenerateDivGrid);

document.querySelector(".solid-draw").addEventListener("click", () => {
    if (curEvent != solidPaint) {
        updateEvents(solidPaint);
    }
});
document.querySelector(".rgb-draw").addEventListener("click", () => {
    if (curEvent != rgbPaint) {
        updateEvents(rgbPaint);
    }
});
document.querySelector(".darker-draw").addEventListener("click", () => {
    if (isDarkerModeOn) {
        removeEvents(darkerPaint);
    } else {
        addEvents(darkerPaint);
    }

    isDarkerModeOn = !isDarkerModeOn;
});

document.querySelector(".clear").addEventListener("click", clearDivGrid);

generateDivGrid(getOrderOfMatrix());