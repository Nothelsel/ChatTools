let stateBlur = false;
let history = document.querySelector("div.flex-col.flex-1.overflow-y-auto.border-b.border-white\\/20.-mr-2");
const nav = document.querySelector("nav");
const historyButton = document.createElement("a");
const deleteAllButton = document.createElement("a");

let template = (title, hide) => {
    return `
    <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6c-3.182 0-6.182 2.141-8.571 6c2.389 3.859 5.389 6 8.571 6c3.182 0 6.182-2.141 8.571-6C18.182 8.141 15.182 6 12 6z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    ${hide ? ' <line x1="3" y1="21" x2="21" y2="3"></line>' : ''}
  </svg>${title}
    `;
}


function loadHistory() {
    history = document.querySelector(
        "div.flex-col.flex-1.overflow-y-auto.border-b.border-white\\/20.-mr-2"
    );
}

function processHider() {
    if (!history) loadHistory();
    if (!stateBlur) {
        history.style.filter = "blur(10px)";
        historyButton.innerHTML = template("Afficher l'historique", false);
        stateBlur = true;
    } else {
        history.style.filter = "none";
        historyButton.innerHTML = template("Cacher l'historique", true);
        stateBlur = false;
    }
}

function init() {
    
    historyButton.setAttribute("class","flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm");
    historyButton.innerHTML = template("Afficher l'historique", false);
    historyButton.addEventListener("click", () => {
        processHider();
    });
    nav.appendChild(historyButton);
    setTimeout(() => {
        processHider();
    }, 1000);
}

init();
