"use strict";
/**
 * Participants API endpoints for RaceResult Web API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsApi = void 0;
class ParticipantsApi {
    constructor(eventApi) {
        this.eventApi = eventApi;
    }
    /**
     * Get fields of one participant
     * @param identifier - Object with identifier name and value (e.g., { PID: 123 } or { Bib: 456 })
     * @param fields - Array of field names to retrieve
     * @returns Promise with participant field values
     */
    async getFields(identifier, fields) {
        // Build parameters - identifier name and value are separate parameters
        const params = {};
        // Add identifier to parameters (use lowercase for parameter names)
        for (const [key, value] of Object.entries(identifier)) {
            params[key.toLowerCase()] = value;
        }
        // Add fields as JSON-encoded array (like Go does)
        if (fields && fields.length > 0) {
            params.fields = JSON.stringify(fields);
        }
        return this.eventApi.get('part/getfields', params);
    }
    /**
     * Get participant by ID
     */
    async getById(id) {
        return this.eventApi.get(`participants/${id}`);
    }
    /**
     * Create new participant
     */
    async create(participantData) {
        return this.eventApi.post('participants', undefined, participantData);
    }
    /**
     * Update participant
     */
    async update(id, participantData) {
        return this.eventApi.post(`participants/${id}`, undefined, participantData);
    }
    /**
     * Delete participant by ID
     */
    async delete(id) {
        await this.eventApi.post(`participants/${id}/delete`);
    }
    /**
     * Delete participants by filter (bulk delete)
     * @param filter - Filter expression for participants to delete
     * @param bib - Specific bib number to delete (alternative to filter)
     * @param version - Version for optimistic locking
     */
    async deleteByFilter(filter, bib = 0, version = 0) {
        const params = {
            filter,
            bib,
            version
        };
        await this.eventApi.get('part/delete', params);
    }
    /**
     * Save multiple participants
     * @param participants - Array of participant data objects
     * @param noHistory - Whether to skip adding entries to the history
     */
    async save(participants, noHistory = false) {
        const params = {
            noHistory
        };
        await this.eventApi.post('part/savefields', params, participants);
    }
}
exports.ParticipantsApi = ParticipantsApi;
//# sourceMappingURL=participants.js.map