/**
 * @title RealChain
 * @symbol RCT
 * @ethContractAddr 0x13f25cd52b21650caa8225C9942337d914C9B030
 * @implementation Dynamic
 * @cmcId realchain
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x13f25cd52b21650caa8225C9942337d914C9B030?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
