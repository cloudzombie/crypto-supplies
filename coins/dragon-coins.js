/**
 * @title Dragon Coins
 * @symbol DRG
 * @ethContractAddr 0x814f67fa286f7572b041d041b1d99b432c9155ee
 * @implementation Dynamic
 * @cmcId dragon-coins
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x814f67fa286f7572b041d041b1d99b432c9155ee?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -8)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
