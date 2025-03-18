// Handle the conversion
convertAndCopy() {
    console.log('nice');
}

// Add a button to trigger the conversion
function addButton() {
    // Identify the navbar with download buttons using its unique class
    const orderRow = document.getElementsByClassName('order-table')[0];
    // Identify the container div with the actual buttons
    let buttonRow;
    for (let c = 0; c < orderRow.children.length; c++) {
        if (orderRow.children[c].classList.includes('col-xs-6')) {
            buttonRow = orderRow.children[c];
        }
    }
    // That container div typically contains one or more spacers divs.
    // Find the last one
    let buttonPlaceholder;
    for (let b = 0; b < buttonRow.children.length; b++) {
        if (buttonRow.children[b].classList.includes('clearfix')) {
            buttonPlaceholder = buttonRow.children[b];
        }
    }
    // Now generate our button. Here's what it needs to match:
    /*
    <a 
        href="#" 
        class="text-primary pull-right download-button material-icons-container "
    >
        <span 
            class="material-icons hidden-xs"
        >
            get_app
        </span> 
        IMEI List
    </a>
    */
   let button = document.createElement('a');
   button.href = '#';
   button.classList = 'text-primary pull-right download-button material-icons-container';
   let buttonIcon = document.createElement('span');
    buttonIcon.classList = 'material-icons hidden-xs';
    buttonIcon.innerText = 'content_copy';
    button.appendChild(buttonIcon);
    button.innerText = 'Copy to Convert';
    button.addEventListener('click', () => {convertAndCopy()});

}

addButton();