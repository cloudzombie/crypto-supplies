/**
 * @title Cobinhood
 * @symbol COB
 * @ethContractAddr 0xb2f7eb1f2c37645be61d73953035360e768d81e6
 * @implementation Dynamic
 * @cmcId cobinhood
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xb2f7eb1f2c37645be61d73953035360e768d81e6?apiKey=freekey', (error, response, body) => {
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
