let skus = [];
let quantities = [];
let costs = [];
let orderNumber = '';

let table = document.getElementsByClassName('swp-print-order-table')[0]; // Identify the table containing the data
let tbody = table.children[1];
let rows = tbody.children; // Identify all the rows containing the order information

for (let r = 0; r < rows.length; r++) { // Loop through each row in the table and pull the relevant data
    skus[r] = rows[r].children[0].innerText;
    quantities[r] = rows[r].children[1].innerText;
    costs[r] = rows[r].children[3].innerText;
}

orderNumber = document.getElementsByClassName('code-numbers')[0].children[0].innerText; // Get the order number

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