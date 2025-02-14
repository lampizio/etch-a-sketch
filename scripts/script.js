function generateDivGrid(n) {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            let item = document.createElement("div");
            item.className = "item";
            item.style.flexBasis = `calc(100% / ${n})`;
            item.style.opacity = 1;
            GRID.appendChild(item);
        }
    }
}

function getOrderOfMatrix() {
    let n;
    do {
        n = prompt("Enter the n (0 < n <= 100):");
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

function updateEventCallback(event) {
    GRID.removeEventListener("mouseover", curEvent);
    curEvent = event;
    GRID.addEventListener("mouseover", curEvent);
}

function solidPaint(event) {
    if (!event.target.classList.contains("item")) return;

    event.target.style.opacity = 1;
    event.target.style.backgroundColor = curColor;
}

function rgbPaint(event) {
    if (!event.target.classList.contains("item")) return;

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    event.target.style.opacity = 1;
    event.target.style.backgroundColor = "#" + randomColor;
}

function darkerPaint(event) {
    if (!event.target.classList.contains("item")) return;
    
    if (event.target.style.opacity >= 0.1 * 2) {
        event.target.style.opacity -= 0.1;
    }
}

let colorPallette = document.querySelector("#color-dialog");

const GRID = document.querySelector(".square-container");
let curEvent = null;
let curColor = colorPallette.value;

colorPallette.addEventListener("change", (event) => {
    curColor = event.target.value;
})

document.querySelector(".solid-draw").addEventListener("click", () => {
    if (curEvent != solidPaint) {
        updateEventCallback(solidPaint);
    }
});
document.querySelector(".rgb-draw").addEventListener("click", () => {
    if (curEvent != rgbPaint) {
        updateEventCallback(rgbPaint);
    }
});
document.querySelector(".darker-draw").addEventListener("click", () => {
    if (curEvent != darkerPaint) {
        updateEventCallback(darkerPaint);
    }
});

document.querySelector(".regenerate").addEventListener("click", regenerateDivGrid);
document.querySelector(".clear").addEventListener("click", clearDivGrid);

generateDivGrid(getOrderOfMatrix());