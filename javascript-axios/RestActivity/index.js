const config = {
    maxSockets: 10,
    maxFreeSockets: 10,
    timeout: 30000,
    freeSocketKeepAliveTimeout: 30000
};
const Agent = require("agentkeepalive").HttpsAgent;
const agent = new Agent(config);
const axios = require("axios").default;
axios.defaults.httpsAgent = agent;

const Bottleneck = require("bottleneck");
const limiter = new Bottleneck({ minTime: 250 });

module.exports = async function (context) {
    context.log(`Running RestActivity at ${context.bindings.input.url} ...`);
    // const resp = await axios.post(context.bindings.input.url);
    const resp = await limiter.schedule(() => axios.post(context.bindings.input.url));
    return { statusCode: resp.status };
};