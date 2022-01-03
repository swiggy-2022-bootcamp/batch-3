import { handleBodyRequestParsing, allowCors, reqConsoleLogger,handleCompression, useHelmet } from "./common.middleware";

export default [useHelmet,handleBodyRequestParsing, allowCors, reqConsoleLogger, handleCompression];
// add request limiter ->pending