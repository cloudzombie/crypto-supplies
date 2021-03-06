/**
 * @title EDUCare
 * @symbol EKT
 * @ethContractAddr 0xbab165df9455aa0f2aed1f2565520b91ddadb4c8
 * @implementation Dynamic
 * @cmcId educare
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xbab165df9455aa0f2aed1f2565520b91ddadb4c8?apiKey=freekey', (error, response, body) => {
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
