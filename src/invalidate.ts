import * as _debug from "debug";
import * as AWS from "aws-sdk";
const nanoid = require("nanoid/async/generate");


const info = _debug("cloudfrontinvalider-info-handler");
const debug = _debug("cloudfrontinvalider-debug-handler");
const error = _debug("cloudfrontinvalider-error-handler");

const RANDOM_LEN = parseInt(process.env.RANDOM_LEN || "12");
const RANDOM_ALPHABET = process.env.RANDOM_ALPHABET || "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

/**
 * Invalidate CloudFront distribution cache.
 * For the random part of the invalidation reference there is used nanoid with RANDOM_LEN of 12
 * with 10 id generation / s per distribution give the probability of collision of 1% of having at least
 * 1 same id in ~31 years. To decrease probability change the env variable. calculator:
 * https://zelark.github.io/nano-id-cc/
 * The len can be changed in the env variable RANDOM_LEN and the alphabet in RANDOM_ALPHABET.
 * @param id of the distribution
 * @param path fo invalidate. By default it /*
 * @param invalidationIdPrefix prefix of the invalidation reference. By default it is empty
 * @param invalidationIdPostfix postix of the invalidation reference. By default is is random value
 */
export default async (id: string, path?: string, invalidationIdPrefix?: string, invalidationIdPostfix?: string): Promise<any> => {
    path = path || "/*";
    invalidationIdPrefix = invalidationIdPrefix || "";
    invalidationIdPostfix = invalidationIdPostfix || await nanoid(RANDOM_ALPHABET, RANDOM_LEN);
    const parameters = {
        DistributionId: id, /* required */
        InvalidationBatch: { /* required */
            CallerReference: `${invalidationIdPrefix}${invalidationIdPostfix}`, /* required */
            Paths: { /* required */
                Quantity: 1, /* required */
                Items: [
                    path,
                ]
            }
        }
    };
    const response = await new AWS.CloudFront({apiVersion: '2019-03-26'}).createInvalidation(parameters).promise();

    info(`cloudfront[${id}] created invalidation for:${path}.`);
    debug(`Invalidation response:${JSON.stringify(response)}`);
    return response;
};
