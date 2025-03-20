// Handle the conversion
function convertAndCopy() {
    console.log('nice');
}

// Add a button to trigger the conversion
function addButton() {
    // Identify the navbar with download buttons using its unique class
    const orderRow = document.getElementsByClassName('order-table')[0];
    if (orderRow && orderRow.children) {
        // Identify the container div with the actual buttons
        let buttonRow;
        for (let c = 0; c < orderRow.children.length; c++) {
            if (orderRow.children[c].classList.contains('col-xs-6')) {
                buttonRow = orderRow.children[c];
            }
        }
        // That container div typically contains one or more spacers divs.
        // Find the last one
        let buttonPlaceholder;
        for (let b = 0; b < buttonRow.children.length; b++) {
            if (buttonRow.children[b].classList.contains('clearfix')) {
                buttonPlaceholder = buttonRow.children[b];
            }
        }
        // Now generate the button        
        let button = document.createElement('a');
        button.href = '#';
        button.classList = 'text-primary pull-right download-button material-icons-container';
        let buttonIcon = document.createElement('span');
        buttonIcon.classList = 'material-icons hidden-xs';
        button.innerHTML = `<span class="material-icons hidden-xs">content_copy</span> Copy to Convert`;
        button.appendChild(buttonIcon);
        button.addEventListener('click', () => {convertAndCopy()});
        // Add the button and remove that hidden placeholder div
        buttonPlaceholder.parentElement.appendChild(button);
        buttonPlaceholder.remove();
    }
    

}

addButton();