"use strict";
/**
 * General API endpoints for RaceResult Web API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralApi = void 0;
class GeneralApi {
    constructor(api) {
        this.api = api;
    }
    /**
     * Get API version information
     */
    async version() {
        return this.api.get('', 'version');
    }
    /**
     * Health check endpoint
     */
    async ping() {
        return this.api.get('', 'ping');
    }
    /**
     * Get server time
     */
    async serverTime() {
        return this.api.get('', 'servertime');
    }
}
exports.GeneralApi = GeneralApi;
//# sourceMappingURL=general.js.map