let stateBlur = false;
let history = document.querySelector(
    "div.flex-col.flex-1.overflow-y-auto.border-b.border-white\\/20.-mr-2"
);
let nav = document.querySelector("nav");
let body = document.querySelector("body");
const historyButton = document.createElement("a");

let blocksChat = document.querySelector(
    ".flex.flex-col.items-center.text-sm.dark\\:bg-gray-800"
);
const observerOptions = { childList: true, subtree: true };
let reload = false;

let historyIcon = (title, hide) => {
    return `
    <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6c-3.182 0-6.182 2.141-8.571 6c2.389 3.859 5.389 6 8.571 6c3.182 0 6.182-2.141 8.571-6C18.182 8.141 15.182 6 12 6z"></path>
    <circle cx="12" cy="12" r="3"></circle> ${
        hide ? ' <line x1="3" y1="21" x2="21" y2="3"></line>' : ""
    } </svg>${title}`;
};

let expandsIcon = (title, hide) => {
    return `${hide ? `<svg stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
      xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" /> </svg>` : `<svg stroke="currentColor" fill="none" 
      viewBox="0 0 24 24" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
       xmlns="http://www.w3.org/2000/svg"><path d="M18 15l-6-6-6 6" /></svg>`}
   ${title}`;
}

function loadhistory() {
    history = document.querySelector(
        "div.flex-col.flex-1.overflow-y-auto.border-b.border-white\\/20.-mr-2"
    );
}

function loadBlocks() {
    blocksChat = document.querySelector(
        ".flex.flex-col.items-center.text-sm.dark\\:bg-gray-800"
    );
}

function loadNav() {
    nav = document.querySelector("nav");
}

function loadBody() {
    body = document.querySelector("body");
}

function getNext() {
    return document.querySelector("#__next");
}

const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            // Boucle sur les nœuds ajoutés
            mutation.addedNodes.forEach(function (node) {
                // Vérifie que le nœud est une div
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.nodeName === "DIV"
                ) {
                    // Appelle la fonction pour chaque nouvelle div
                    addExpandButton(node);
                }
            });
        }
    }
};

const callbackReload = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.target == getNext() && !reload) {
            stateBlur = false;
            init(true);
            reload = true;
            break;
        }
    }
};

const observer = new MutationObserver(callback);

function processHider() {
    if (!history) {
        loadhistory();
    }
    if (!stateBlur) {
        history.style.filter = "blur(5px)";
        historyButton.innerHTML = historyIcon("Show history", false);
    } else {
        history.style.filter = "none";
        historyButton.innerHTML = historyIcon("Hide history", true);
    }
    stateBlur = !stateBlur;
    reload = false;
}

function addExpandButton(div) {
    const button = document.createElement("a");
    button.className =
        "flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm show";
    button.style.width = "2.5rem";
    button.innerHTML = expandsIcon("", false);

    function toggleCard() {
        const card = div.firstElementChild;
        const isShown = button.classList.contains("show");

        button.classList.toggle("show");
        button.classList.toggle("hide");
        button.innerHTML = expandsIcon("", isShown);
        card.style.display = isShown ? "none" : "flex";
        card.style.transition = "display 0.5s";
    }

    button.addEventListener("click", toggleCard);
    div.appendChild(button);
}

function init(reload = false) {
    loadBlocks();
    loadNav();
    loadBody();
    loadhistory();

    historyButton.setAttribute(
        "class",
        "flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
    );
    historyButton.innerHTML = historyIcon("Show history", false);
    historyButton.addEventListener("click", processHider);

    nav.appendChild(historyButton);

    setTimeout(() => {
        blocksChat
            .querySelectorAll(".w-full.border-b")
            .forEach(function (node) {
                addExpandButton(node);
            });
        const observer = new MutationObserver(callback);
        const obsReload = new MutationObserver(callbackReload);
        observer.observe(blocksChat, observerOptions);
        obsReload.observe(body, observerOptions);
        processHider();
    }, 100);
}

init();
