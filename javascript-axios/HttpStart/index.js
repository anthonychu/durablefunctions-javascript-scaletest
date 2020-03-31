const df = require("durable-functions");
const config = {
    maxSockets: 10,
    maxFreeSockets: 10,
    timeout: 30000,
    freeSocketKeepAliveTimeout: 30000
};
const Agent = require('http').Agent;
const agent = new Agent(config);
const axios = require("axios").default;
axios.defaults.httpAgent = agent;

module.exports = async function (context, req) {
    const client = df.getClient(context);

    const tasks = [];
    for (var i = 0; i < req.params.instances; i++) {
        tasks.push(client.startNew(req.params.functionName));
    }

    const instanceIds = await Promise.all(tasks);

    return instanceIds;
};