"use strict";
/**
 * Contests API endpoints for RaceResult Web API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestsApi = void 0;
class ContestsApi {
    constructor(eventApi) {
        this.eventApi = eventApi;
    }
    /**
     * Get all contests
     */
    async list() {
        const response = await this.eventApi.get('contests/get');
        return Array.isArray(response) ? response : [];
    }
    /**
     * Get contest by ID
     */
    async getById(id) {
        return this.eventApi.get('contests/get', { id });
    }
    /**
     * Create new contest
     */
    async create(contestData) {
        return this.eventApi.post('contests/save', undefined, contestData);
    }
    /**
     * Update contest
     */
    async update(id, contestData) {
        return this.eventApi.post('contests/save', { oldID: id }, contestData);
    }
    /**
     * Delete contest
     */
    async delete(id) {
        await this.eventApi.get('contests/delete', { id });
    }
    /**
     * Save contest (create or update)
     * @param contest - Contest data object
     * @param version - Version number for optimistic locking
     * @returns Contest ID of the saved contest
     */
    async save(contest, version = 0) {
        const data = { ...contest };
        if (version > 0) {
            data.Version = version;
        }
        const response = await this.eventApi.post('contests/save', undefined, data);
        return parseInt(String(response), 10);
    }
    /**
     * Get contests as PDF
     */
    async getPdf() {
        return this.eventApi.get('contests/pdf');
    }
}
exports.ContestsApi = ContestsApi;
//# sourceMappingURL=contests.js.map