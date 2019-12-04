const request = require("request");
const http = require("http");
const https = require("https");
const axios = require('axios').default;
// const MAX_SOCKETS = 10;
// axios.defaults.httpAgent = new http.Agent({maxSockets: MAX_SOCKETS, maxFreeSockets: MAX_SOCKETS});;
// axios.defaults.httpsAgent = new https.Agent({maxSockets: MAX_SOCKETS, maxFreeSockets: MAX_SOCKETS});

module.exports = async function (context) {
    context.log(`Running RestActivity at ${context.bindings.input.url} ...`);

    let err, resp;

    try {
        resp = await axios.post(context.bindings.input.url);
    } catch (e) {
        err = e;
        context.log.error(e);
    }

    return {
        statusCode: resp && resp.status,
        error: err && err.message,
        serverId: process.env.WEBSITE_INSTANCE_ID
    };

    // var resp = await new Promise((resolve, reject) => {
    //     request(context.bindings.input.url, (err, resp, body) => {
    //         let e;
    //         if (err) {
    //             e = err;
    //         } else if (body.error) {
    //             e = body.error;
    //         } else if (body.response && body.response.error) {
    //             e = body.response.error;
    //         }

    //         if (e) {
    //             context.log.error(e);
    //         } else {
                
    //         }

    //         resolve({
    //             statusCode: resp.statusCode,
    //             error: e
    //         });
    //     });
    // });

    // return resp;
};