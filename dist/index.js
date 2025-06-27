"use strict";
/**
 * @sptiming/rr-webapi - TypeScript/Node.js client for RaceResult Web API
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataApi = exports.ContestsApi = exports.ParticipantsApi = exports.DataApi = exports.GeneralApi = exports.EventApi = exports.PublicApi = exports.RaceResultApi = void 0;
// Main API class
var api_1 = require("./api");
Object.defineProperty(exports, "RaceResultApi", { enumerable: true, get: function () { return api_1.RaceResultApi; } });
// Types
__exportStar(require("./types"), exports);
// Endpoint classes (for advanced usage)
var public_1 = require("./endpoints/public");
Object.defineProperty(exports, "PublicApi", { enumerable: true, get: function () { return public_1.PublicApi; } });
var event_1 = require("./endpoints/event");
Object.defineProperty(exports, "EventApi", { enumerable: true, get: function () { return event_1.EventApi; } });
var general_1 = require("./endpoints/general");
Object.defineProperty(exports, "GeneralApi", { enumerable: true, get: function () { return general_1.GeneralApi; } });
var data_1 = require("./endpoints/data");
Object.defineProperty(exports, "DataApi", { enumerable: true, get: function () { return data_1.DataApi; } });
var participants_1 = require("./endpoints/participants");
Object.defineProperty(exports, "ParticipantsApi", { enumerable: true, get: function () { return participants_1.ParticipantsApi; } });
var contests_1 = require("./endpoints/contests");
Object.defineProperty(exports, "ContestsApi", { enumerable: true, get: function () { return contests_1.ContestsApi; } });
var rawdata_1 = require("./endpoints/rawdata");
Object.defineProperty(exports, "RawDataApi", { enumerable: true, get: function () { return rawdata_1.RawDataApi; } });
// Default export for convenience
const api_2 = require("./api");
exports.default = api_2.RaceResultApi;
//# sourceMappingURL=index.js.map