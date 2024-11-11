// Generate and download the CSV file
function generate() {
    let skus = [];
    let quantities = [];
    let costs = [];
    let orderNumber;

    let skuDivs = document.getElementsByClassName('product-line-sku-value');
    for (let sd = 0; sd < skuDivs.length; sd++) {
        skus[sd] = skuDivs[sd].innerText;
    }

    let qtyDivs = document.getElementsByClassName('transaction-line-views-quantity-amount-value');
    for (let qt = 0; qt < qtyDivs.length; qt++) {
        quantities[qt] = qtyDivs[qt].innerText;
    }

    let costDivs = document.getElementsByClassName('transaction-line-views-quantity-amount-item-amount');
    for (let co = 0; co < costDivs.length; co++) {
        costs[co] = costDivs[co].innerText;
    }

    let csvData = [];
    for (let sku in skus) {
        csvData[sku] =  [skus[sku], skus[sku], quantities[sku], costs[sku], ' ', ' ', ' ', ' ', orderNumber, ' ', ' '];
    }
    let csv = 'Catalog Item,Supplier SKU,Qty,Cost,Price,Note,Location,Supplier,Vendor Order ID,Backordered tickets,Use fifo\n';
    csvData.forEach(row => {
        csv += row.join(',');
        csv += '\n';
    });
    let fileName = `${orderNumber}.csv`;
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
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

