

function addButton() {
    let targetSibling = document.getElementsByClassName('order-history-summary-button-reorder')[0];
    let button = document.createElement('a');
    button.classList = 'orderConverterButton';
    button.innerText = 'Download CSV';

    targetSibling.insertAdjacentElement('afterend', button);
    console.log('yuh');
}


// Wait for the page to finish loading before adding the download button
setTimeout(() => { 
    addButton();
}, 1000);

console.log('yuh');