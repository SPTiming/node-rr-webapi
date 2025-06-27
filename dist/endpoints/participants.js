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
     * Delete participant
     */
    async delete(id) {
        await this.eventApi.post(`participants/${id}/delete`);
    }
}
exports.ParticipantsApi = ParticipantsApi;
//# sourceMappingURL=participants.js.map