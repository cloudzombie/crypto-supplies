/**
 * @title Remme
 * @symbol REM
 * @ethContractAddr 0x83984d6142934bb535793a82adb0a46ef0f66b6d
 * @implementation Dynamic
 * @cmcId remme
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x83984d6142934bb535793a82adb0a46ef0f66b6d?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -4)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
