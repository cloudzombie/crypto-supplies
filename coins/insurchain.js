/**
 * @title InsurChain
 * @symbol INSUR
 * @ethContractAddr 0x6ea6531b603f270d23d9edd2d8279135dc5d6773
 * @implementation Dynamic
 * @cmcId insurchain
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x6ea6531b603f270d23d9edd2d8279135dc5d6773?apiKey=freekey', (error, response, body) => {
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
