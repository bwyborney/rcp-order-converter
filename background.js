function orderConverter(){
    // Grab all the elements of the page that have the class 'sku'
    // These will get parsed for their contents, which are the SKUs
    let skus = [];
    for (let i in document.getElementsByClassName('sku')) {
        skus[i] = document.getElementsByClassName('sku')[i];
    }
    let parsedSkus = [];
    for (let j in skus) {
        parsedSkus[j] = skus[j].innerHTML;
    }
    // Remove extraneous HTML, spaces, and other characters from the SKUs
    let strippedSkus = [];
    for (let k in parsedSkus) {
        if(parsedSkus[k] != undefined) {
            //strippedSkus[k] = parsedSkus[k].replace(/ /g, "");
            strippedSkus[k] = parsedSkus[k].replace(/\n/g, "");
            strippedSkus[k] = strippedSkus[k].replace("<small>SKU: <!-- ko text: product_sku -->", "");
            strippedSkus[k] = strippedSkus[k].replace("<!-- /ko --></small>", "");
            strippedSkus[k] = strippedSkus[k].replace("SKU", "");
            strippedSkus[k] = strippedSkus[k].replace(/ /g, "");
        }
    }
    /*
    Apparently, the HTML of any given order page on the RCP website contains several
    invisible elements that also have the class 'sku'. They include prices, quantities,
    and everything else... why they are there, I have no idea. But we need to remove them.
    */
    let fRcp = 0;
    let fRcpCounter = 0;
    for (let i in strippedSkus) {
        if (strippedSkus[i] === "") { // There is always an element with blank contents separating the real rows from the fake ones
            fRcp = fRcpCounter;
        }
        fRcpCounter += 1;
    }
    // Create a new list that only contains the information after the blank divider
    let finalSkus = [];
    let finalSkuCutoffCounter = 0;
    let finalSkuCounter = 0;
    for (let j in strippedSkus) {
        if (finalSkuCutoffCounter > fRcp) {
            finalSkus[finalSkuCounter] = strippedSkus[j];
            finalSkuCounter += 1;
        }
        finalSkuCutoffCounter += 1;
    }

    // Now repeat basically the same process for prices and quantities
    let prices = [];
    for (let i in document.getElementsByClassName('price')) {
        prices[i] = document.getElementsByClassName('price')[i];
    }
    let parsedPrices = [];
    for (let j in prices) {
        parsedPrices[j] = prices[j].innerHTML;
    }
    let strippedPrices = [];
    for (let j in parsedPrices) {
        if (parsedPrices[j] != undefined) {
            strippedPrices[j] = parsedPrices[j].replace("$", "");
            strippedPrices[j] = strippedPrices[j].replace(/\n/g, "");
            strippedPrices[j] = strippedPrices[j].replace("<span class=\"price-excluding-tax\" data-label=\"Excl. Tax\">", "");
            strippedPrices[j] = strippedPrices[j].replace("<span class=\"cart-price\">", "");
            strippedPrices[j] = strippedPrices[j].replace("<span class=\"price\">", "");
            strippedPrices[j] = strippedPrices[j].replace(/<\/span>/g, "");
            strippedPrices[j] = strippedPrices[j].replace(/ /g, "");
        }
    }
    let fRcp2 = 0;
    let fRcpCounter2 = 0;
    for (let n in strippedPrices) {
        if (strippedPrices[n] === "Price") {
            fRcp2 = fRcpCounter2;
        }
        fRcpCounter2 += 1;
    }
    let newPrices = [];
    let newPriceCounter = 0;
    let newPriceCutoffCounter = 0;
    for (let m in strippedPrices) {
        if (newPriceCounter > fRcp2) {
            newPrices[newPriceCutoffCounter] = strippedPrices[m];
            newPriceCutoffCounter += 1;
        }
        newPriceCounter += 1;
    }
    let newNewPrices = [];
    let newNewPriceCutoff = newPrices.length - 4;
    let newNewPriceCounter = 0;
    for (let agh in newPrices) {
        if(newNewPriceCounter < newNewPriceCutoff) {
            newNewPrices[agh] = newPrices[agh];
        }
        newNewPriceCounter  += 1;
    }
    let finalPrices = [];
    finalPrices[0] = newNewPrices[0];
    let finalPriceDivisionCounter = 0;
    let finalPriceCounter = 0;
    for (let final in newNewPrices) {
        if (finalPriceDivisionCounter % 3 === 0) {
            finalPrices[finalPriceCounter] = newNewPrices[final];
            finalPriceCounter += 1;
        }
        finalPriceDivisionCounter += 1;
    }

    let quantities = [];
    let quantityList = document.querySelectorAll('span.content:not(.header)');
    for (let i = 0; i < quantityList.length; i++) {
        quantities[i] = quantityList[i];
    }
    let parsedQuantities = [];
    for (let j in quantities) {
        parsedQuantities[j] = quantities[j].innerHTML;
    }
    let strippedQuantities = [];
    for (let k in parsedQuantities) {
        if (parsedQuantities[k] != undefined) {
            strippedQuantities[k] = parsedQuantities[k].replace(/\n/g, "");
            strippedQuantities[k] = strippedQuantities[k].replace('<a class="logo zagg-brands-logo logo-lrg" href="ht…" class="icon icon-close"></span>    </div></div>', '');
            strippedQuantities[k] = strippedQuantities[k].replace('<table class="data table">            <cap…    </tr>                    </tbody></table>', '');
            strippedQuantities[k] = strippedQuantities[k].replace('<ul class="nav items"><li class="nav item"…    <span class="delimiter"></span></li></ul>', '');
            strippedQuantities[k] = strippedQuantities[k].replace(/ /g, "");
        }
    }
    let finalQuantities = [];
    let finalQuantityCounter = 0;
    let finalQuantityCutoffCounter = 1;
    for (let n in strippedQuantities) {
        if(finalQuantityCutoffCounter % 2 === 0) {
            finalQuantities[finalQuantityCounter] = strippedQuantities[n];
            finalQuantityCounter += 1;
        }
        finalQuantityCutoffCounter += 1;
    }

    let orderNo = document.getElementsByClassName('base')[0].innerHTML.replace('Order # ', '');

    // Create a list that contains all the data we just pulled
    let csvData = [];
    for (let p in finalSkus) {
        csvData[p] =  [finalSkus[p], finalSkus[p], finalQuantities[p], finalPrices[p], ' ', ' ', ' ', ' ', orderNo, ' ', ' '];
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
    let fileName = `${orderNo}.csv`;
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

