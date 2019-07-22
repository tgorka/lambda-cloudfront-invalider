import * as _debug from "debug";
import * as AWS from "aws-sdk";


const info = _debug("cloudfrontinvalider-info-handler");
const debug = _debug("cloudfrontinvalider-debug-handler");
const error = _debug("cloudfrontinvalider-error-handler");

/**
 * Invalidate CloudFront distribution cache.
 * @param id of the distribution
 * @param path fo invalidate. By default it /*
 * @param invalidationIdPrefix prefix of the invalidation reference. By default it is empty
 * @param invalidationIdPostfix postix of the invalidation reference. By default is is random value
 */
export default async (id: string, path?: string, invalidationIdPrefix?: string, invalidationIdPostfix?: string): Promise<any> => {
    path = path || "/*";
    invalidationIdPrefix = invalidationIdPrefix || "STRING_VALUE";
    invalidationIdPostfix = invalidationIdPostfix || "STRING_VALUE";
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
