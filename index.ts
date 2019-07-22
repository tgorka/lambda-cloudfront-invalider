import "source-map-support/register";
import handler from "jslambda-handler";


export const cloudFrontInvalider = handler(import("./src/index"), ["$.id"], ["$.path"]);
