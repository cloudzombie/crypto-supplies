/**
 * @title 300 Token
 * @symbol 300
 * @ethContractAddr 0xaec98a708810414878c3bcdf46aad31ded4a4557
 * @implementation Dynamic
 * @cmcId 300-token
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xaec98a708810414878c3bcdf46aad31ded4a4557?apiKey=freekey', (error, response, body) => {
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
