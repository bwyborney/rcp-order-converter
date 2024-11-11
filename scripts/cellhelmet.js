// Generate and download the CSV file
function generate() {
    let skus = [];
    let quantities = [];
    let costs = [];
}
// Add the "download CSV" button
function addButton() {
    let targetSibling = document.getElementsByClassName('order-history-summary-button-reorder')[0];
    let button = document.createElement('a');
    button.classList = 'orderConverterButton';
    button.innerText = 'Download CSV';
    button.addEventListener('click', () => {generate()});
    targetSibling.insertAdjacentElement('afterend', button);
}

// Check and see if the button elements are present yet
function checkForContents() {
    let buttonList = document.getElementsByClassName('order-history-summary-button-reorder');
    if (buttonList.length > 0) {
        addButton();
    }
}

// Begin a mutation observer to listen for the contents of the page to load
const config = {childList: true, attributes: true};
let watch = document.getElementById('main');
const observer = new MutationObserver(checkForContents);
observer.observe(watch, config);

