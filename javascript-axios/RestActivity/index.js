//const http = require("http");
const https = require("https");
const axios = require('axios').default;
const MAX_SOCKETS = 10;
const config = {
    maxSockets: MAX_SOCKETS
};
//axios.defaults.httpAgent = new http.Agent(config);
axios.defaults.httpsAgent = new https.Agent(config);

const Bottleneck = require("bottleneck");
const limiter = new Bottleneck({ minTime: 250 });

module.exports = async function (context) {
    context.log(`Running RestActivity at ${context.bindings.input.url} ...`);
    // const resp = await axios.post(context.bindings.input.url);
    const resp = await limiter.schedule(() => axios.post(context.bindings.input.url));
    return { statusCode: resp.status };
};