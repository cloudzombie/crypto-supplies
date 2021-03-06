/**
 * @title Nexium
 * @symbol NXC
 * @ethContractAddr 0x45e42D659D9f9466cD5DF622506033145a9b89Bc
 * @implementation Dynamic
 * @cmcId nexium
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x45e42D659D9f9466cD5DF622506033145a9b89Bc?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -3)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
