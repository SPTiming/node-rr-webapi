"use strict";
/**
 * Main API class for RaceResult Web API
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceResultApi = void 0;
const axios_1 = __importDefault(require("axios"));
const public_1 = require("./endpoints/public");
const event_1 = require("./endpoints/event");
const general_1 = require("./endpoints/general");
class RaceResultApi {
    constructor(config) {
        this.sessionId = '';
        this.config = {
            server: config.server,
            https: config.https ?? true,
            userAgent: config.userAgent ?? 'nodejs-webapi/1.0',
            timeout: config.timeout ?? 30000,
        };
        // Create HTTP client
        this.httpClient = axios_1.default.create({
            timeout: this.config.timeout,
            headers: {
                'User-Agent': this.config.userAgent,
            },
        });
        // Initialize endpoint groups
        this._public = new public_1.PublicApi(this);
    }
    /**
     * Get the public API endpoints
     */
    public() {
        return this._public;
    }
    /**
     * Get an event API instance for a specific event
     */
    eventApi(eventId) {
        return new event_1.EventApi(eventId, this);
    }
    /**
     * Get the general API endpoints
     */
    general() {
        return new general_1.GeneralApi(this);
    }
    /**
     * Set custom error generator function
     */
    setErrorGenerator(fn) {
        this.errorGenerator = fn;
    }
    /**
     * Get the current session ID
     */
    getSessionId() {
        return this.sessionId;
    }
    /**
     * Set the session ID (used by login)
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    /**
     * Get the server configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Build URL for API requests
     */
    buildUrl(eventId, endpoint, params) {
        const protocol = this.config.https ? 'https' : 'http';
        let url = `${protocol}://${this.config.server}`;
        if (eventId) {
            url += `/_${eventId}`;
        }
        url += `/api/${endpoint}`;
        if (params && Object.keys(params).length > 0) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
        }
        return url;
    }
    /**
     * Make HTTP request to the API
     */
    async makeRequest(config) {
        const url = this.buildUrl(config.eventId || '', config.endpoint, config.params);
        const headers = {};
        // Add authorization header if we have a session
        if (this.sessionId) {
            headers['Authorization'] = `Bearer ${this.sessionId}`;
        }
        // Add content type if specified
        if (config.contentType) {
            headers['Content-Type'] = config.contentType;
        }
        try {
            const response = await this.httpClient.request({
                method: config.method,
                url,
                headers,
                data: config.data,
            });
            return response.data;
        }
        catch (error) {
            const status = error.response?.status || 0;
            const message = error.response?.data?.Error || error.message || 'Request failed';
            if (this.errorGenerator) {
                throw this.errorGenerator(message, status);
            }
            const apiError = new Error(message);
            apiError.status = status;
            apiError.response = error.response?.data;
            throw apiError;
        }
    }
    /**
     * Make GET request
     */
    async get(eventId, endpoint, params) {
        return this.makeRequest({
            method: 'GET',
            eventId,
            endpoint,
            params,
        });
    }
    /**
     * Make POST request
     */
    async post(eventId, endpoint, params, data, contentType) {
        return this.makeRequest({
            method: 'POST',
            eventId,
            endpoint,
            params,
            data,
            contentType,
        });
    }
}
exports.RaceResultApi = RaceResultApi;
//# sourceMappingURL=api.js.map