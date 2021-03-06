/**
 * @title True Chain
 * @symbol TRUE
 * @ethContractAddr 0xA4d17AB1eE0efDD23edc2869E7BA96B89eEcf9AB
 * @implementation Dynamic
 * @cmcId true-chain
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xA4d17AB1eE0efDD23edc2869E7BA96B89eEcf9AB?apiKey=freekey', (error, response, body) => {
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
