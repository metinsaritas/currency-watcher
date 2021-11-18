#!/usr/local/bin/node
const https = require('https')
const CURRENCY_SYMBOL = {
    TRY: '\u20BA'
}

const OPTIONS = { 
    port: 443,
    hostname: 'www.kuveytturk.com.tr',
    path: '/ck0d84?8C5CC4B13366803C5CD94EA5A2119E69',
    method: 'GET'
}

function onFinished (response) {
    let result = parseJSON(response);
    
    if (result) {
        let goldData = filterGoldData(result)
        console.log(`GAU Sell: ${goldData.SellRate} ${CURRENCY_SYMBOL.TRY}\nGAU Buy: ${goldData.BuyRate} ${CURRENCY_SYMBOL.TRY}`)
    }
}

function filterGoldData (data) {
    return data.find(d => d.CurrencyCode == 'ALT (gr)')
}

function parseJSON (response) {
    try {
        return JSON.parse(response)
    }
    catch (e) {
        onError(e);
    }

    return null
}

function onError (e) {
    console.log(`Error: ${e.message}`)
}

https.request(OPTIONS, response => {
    let result = ''
    response.on('data', chunk => result += chunk)
    response.on('end', () => onFinished(result))
    response.on('error', (e) => onError(e))
}).end()
