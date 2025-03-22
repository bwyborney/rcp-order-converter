// Parse the listed item name into something usable
function parseOutItemName(itemName) {
    // Create a placholder array to split the itemName string into
    let splitName = [];
    // Item names are written in different formats depending on the warehouse.
    // Figure out here which format is being used
    if (/(.*\.){3,}/gm.test(itemName)) { // Test for dots between substrings
        splitName = itemName.split('.');
    } else if (/(.* \/ ){3,}/gm.test(itemName)) { // Test for slashes between substrings
        splitName = itemName.split(' / ');
    }
    // Create an object for holding each individual part of the item name
    let parsedItemName = {
        model: '',
        storage: '',
        color: ''
    };
    // Create some regex to match the item name
    let nameRegex = /^(iPhone|iPod|iPad|Macbook|Watch|Pixel|Moto|Edge|Razr|Revvl|Nord).*/;
    // Regex to match storage
    let storageRegex = /[0-9]{2,4}(GB|gb|Gb)$/;
    // Loop through the split array and try to identify each bit of information
    for (let n = 0; n < splitName.length; n++) {
        if (nameRegex.test(splitName[n])) { 
            parsedItemName.model = splitName[n];
        } else if (storageRegex.test(splitName[n])) { 
            parsedItemName.storage = splitName[n];
        }
    }

    return parsedItemName;
}

// Triggered when the button is clicked. Pull all the information off the page
function convertAndCopy() {
    // Set up an array to hold the data as it is captured
    let data = [];
    // Identify the table body
    const table = document.getElementById('DataTables_Table_0').children[1];
    // Loop through each row in the table
    for (let t = 0; t < table.children.length; t++) {
        let row = table.children[t];
        let itemName = row.children[0].innerText;
        // Send the name of the item out to be parsed
        let parsedItemName = parseOutItemName(itemName);
        console.log(parsedItemName);
    }
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