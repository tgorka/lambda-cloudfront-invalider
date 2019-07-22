import "source-map-support/register";
import handler from "jslambda-handler";


export const invalidate = handler(import("./src/invalidate"), [], ["$.id", "$.path", "$.invalidationIdPrefix", "$.invalidationIdPostfix"]);
