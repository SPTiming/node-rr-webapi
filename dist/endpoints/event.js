"use strict";
/**
 * Event API endpoints for RaceResult Web API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventApi = void 0;
const data_1 = require("./data");
const participants_1 = require("./participants");
const contests_1 = require("./contests");
const rawdata_1 = require("./rawdata");
class EventApi {
    constructor(eventId, api) {
        this.eventId = eventId;
        this.api = api;
        this._data = new data_1.DataApi(this);
        this._participants = new participants_1.ParticipantsApi(this);
        this._contests = new contests_1.ContestsApi(this);
        this._rawData = new rawdata_1.RawDataApi(this);
    }
    /**
     * Get the event ID
     */
    getEventId() {
        return this.eventId;
    }
    /**
     * Get the API instance
     */
    getApi() {
        return this.api;
    }
    /**
     * Get data endpoints
     */
    data() {
        return this._data;
    }
    /**
     * Get participants endpoints
     */
    participants() {
        return this._participants;
    }
    /**
     * Get contests endpoints
     */
    contests() {
        return this._contests;
    }
    /**
     * Get raw data endpoints
     */
    rawData() {
        return this._rawData;
    }
    /**
     * Make GET request to event endpoint
     */
    async get(endpoint, params) {
        return this.api.get(this.eventId, endpoint, params);
    }
    /**
     * Make POST request to event endpoint
     */
    async post(endpoint, params, data, contentType) {
        return this.api.post(this.eventId, endpoint, params, data, contentType);
    }
    /**
     * Execute multiple requests in parallel
     */
    async multiRequest(requests) {
        const promises = requests.map(req => {
            if (req.method === 'POST') {
                return this.post(req.endpoint, req.params, req.data);
            }
            return this.get(req.endpoint, req.params);
        });
        return Promise.all(promises);
    }
}
exports.EventApi = EventApi;
//# sourceMappingURL=event.js.map