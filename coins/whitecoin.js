/**
 * @title WhiteCoin
 * @symbol XWC
 * @implementation Dynamic
 * @cmcId whitecoin
 */

module.exports = (callback, request) => {
    request({
        uri: 'http://explorer.whitecoin.info/chain/Whitecoin/q/totalbc'
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback({
                c: Number(body)
            })
        } else {
            callback(new Error('Request error ' + (typeof response !== 'undefined' ? response.statusCode : error.message)));
        }
    });
};
