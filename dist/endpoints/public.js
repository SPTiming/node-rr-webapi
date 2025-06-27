"use strict";
/**
 * Public API endpoints for RaceResult Web API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicApi = void 0;
class PublicApi {
    constructor(api) {
        this.api = api;
    }
    /**
     * Login with API key or username/password
     */
    async login(credentials) {
        let data = {};
        if (credentials.apiKey) {
            data.apikey = credentials.apiKey;
        }
        else if (credentials.username && credentials.password) {
            data.user = credentials.username;
            data.pw = credentials.password;
        }
        else {
            throw new Error('Either apiKey or username/password must be provided');
        }
        // Use the correct endpoint and content type
        const response = await this.api.post('', 'public/login', undefined, data, 'application/x-www-form-urlencoded');
        // Extract session ID from response
        if (typeof response === 'string' && response.length > 0) {
            this.api.setSessionId(response);
        }
        else {
            throw new Error('Login failed: No session ID received');
        }
    }
    /**
     * Logout and clear session
     */
    async logout() {
        await this.api.get('', 'public/logout');
        this.api.setSessionId('');
    }
    /**
     * Get current session ID
     */
    getSessionId() {
        return this.api.getSessionId();
    }
    /**
     * Get user information
     */
    async userInfo() {
        return this.api.get('', 'public/userinfo');
    }
    /**
   * Get list of events
   */
    async eventList() {
        const params = {
            year: 0,
            filter: '',
            addsettings: 'EventName,EventDate,EventDate2,EventLocation,EventCountry'
        };
        const response = await this.api.get('', 'public/eventlist', params);
        // Convert response to EventListItem array
        if (Array.isArray(response)) {
            return response.map((item) => ({
                id: String(item.ID || ''),
                event_name: item.EventName || '',
                event_date: item.EventDate ? new Date(item.EventDate) : null,
                participants: item.Participants || 0,
                ...item,
            }));
        }
        return [];
    }
    /**
     * Create a new event
     */
    async createEvent(eventData) {
        return this.api.post('', 'createevent', undefined, eventData);
    }
    /**
     * Delete an event
     */
    async deleteEvent(eventId) {
        await this.api.post('', 'deleteevent', { eventid: eventId });
    }
}
exports.PublicApi = PublicApi;
//# sourceMappingURL=public.js.map