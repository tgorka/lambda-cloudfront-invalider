import * as _debug from "debug";
import * as AWS from "aws-sdk";


const info = _debug("cloudfrontinvalider-info-handler");
const debug = _debug("cloudfrontinvalider-debug-handler");
const error = _debug("cloudfrontinvalider-error-handler");

export default async (id: string, path?: string, invalidationId?: string): Promise<any> => {
    path = path || "/*";
    invalidationId = invalidationId || "STRING_VALUE";
    const parameters = {
        DistributionId: id, /* required */
        InvalidationBatch: { /* required */
            CallerReference: invalidationId, /* required */
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
