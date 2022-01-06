import { handleBodyRequestParsing, allowCors, reqConsoleLogger,handleCompression, useHelmet , requestLimiter} from "./common.middleware";

export default [useHelmet,handleBodyRequestParsing, allowCors, reqConsoleLogger, handleCompression , requestLimiter];
