import * as _debug from "debug";


const info = _debug("cloudfrontinvalider-info-handler");
const debug = _debug("cloudfrontinvalider-debug-handler");
const error = _debug("cloudfrontinvalider-error-handler");

export default async (id: string, path?: string): Promise<any> => {
    path = path || "/*";

    info(`cloudfront[${id}] created invalidation for:${path}.`);
    return {success: true};
};
