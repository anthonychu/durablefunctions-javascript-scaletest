const request = require("request").defaults({ pool: { maxSockets: 10 }});
const Bottleneck = require("bottleneck");
const limiter = new Bottleneck({ minTime: 250 });

module.exports = function (context) {
    context.log(`Running RestActivity at ${context.bindings.input.url} ...`);
    return limiter.schedule(() => callHttp(context.bindings.input.url));

    function callHttp(url) {
        return new Promise((resolve, reject) => {
            request(url, (err, resp, body) => {
                if (err) reject(err);
                else if (body.error) reject(body.error);
                else if (body.response
                    && body.response.error) reject(body.response.error);
                resolve(resp);
            });
        });
    }
};