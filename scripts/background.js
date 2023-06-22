function orderConverter() {
    // Initialize some arrays to hold all the important information
    let skus = [];
    let quantities = [];
    let costs = [];

    // Find the table containing the relevant data, which is the second invoice-table
    const tables = document.getElementsByClassName('invoice-table')[2];
    // Find the second child of the table, which is the tbody
    const invoiceTable = tables.children[1];
    
    // Loop through each row and then each td in the tbody to pick out the relevant information
    let counter = 0;
    for (let row of invoiceTable.children) {
        skus[counter] = row.children[0].textContent;
        quantities[counter] = row.children[2].textContent;
        costs[counter] = row.children[3].textContent;
        counter += 1;
    }

    // Get the order number
    let orderNumber = document.getElementsByClassName('invoice-table')[0]
        .children[1]
        .children[0]
        .children[1]
        .textContent;

    // Create a list that contains all the data we just pulled
    let csvData = [];
    for (let sku in skus) {
        csvData[sku] =  [skus[sku], skus[sku], quantities[sku], costs[sku], ' ', ' ', ' ', ' ', orderNumber, ' ', ' '];
        // Those blank spaces are going to fill in the columns like 'Supplier' and 'Use fifo,' since they're not needed
    }

    // Create the header row for the CSV file
    let csv = 'Catalog Item,Supplier SKU,Qty,Cost,Price,Note,Location,Supplier,Vendor Order ID,Backordered tickets,Use fifo\n';
    // Add the data from the csvData variable, one index at a time. Each index will be a row in the CSV file
    csvData.forEach(row => {
        csv += row.join(',');
        csv += '\n';
    });
    // Generate and download the CSV file
    let fileName = `${orderNumber}.csv`;
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
    
}



// When the extension is clicked, run the orderConverter() function above
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: orderConverter,
    });
});