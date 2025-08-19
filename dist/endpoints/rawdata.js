"use strict";
/**
 * Raw Data API endpoints for RaceResult Web API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataApi = void 0;
class RawDataApi {
    constructor(eventApi) {
        this.eventApi = eventApi;
    }
    /**
     * Get raw data by participant ID (PID)
     */
    async getByPid(pid) {
        const params = {
            pid,
            filter: '',
            rdFilter: '{}',
            addFields: [],
            firstRow: 0,
            maxRows: 0,
            sortBy: ''
        };
        const response = await this.eventApi.get('rawdata/get', params);
        return Array.isArray(response) ? response : [];
    }
    /**
     * Get raw data by bib number
     */
    async getByBib(bib) {
        const params = {
            bib,
            filter: '',
            rdFilter: '{}',
            addFields: [],
            firstRow: 0,
            maxRows: 0,
            sortBy: ''
        };
        const response = await this.eventApi.get('rawdata/get', params);
        return Array.isArray(response) ? response : [];
    }
    /**
     * Get all raw data
     */
    async getAll() {
        const response = await this.eventApi.get('rawdata');
        return Array.isArray(response) ? response : [];
    }
    /**
     * Add raw data entry
     */
    async add(rawDataEntry) {
        return this.eventApi.post('rawdata', undefined, rawDataEntry);
    }
    /**
     * Update raw data entry
     */
    async update(id, rawDataEntry) {
        return this.eventApi.post(`rawdata/${id}`, undefined, rawDataEntry);
    }
    /**
     * Delete raw data entry
     */
    async delete(id) {
        await this.eventApi.post(`rawdata/${id}/delete`);
    }
    /**
     * Add a raw data entry manually
     * @param timingPoint - Name of the timing point
     * @param identifierName - Type of identifier ('bib' or 'pid')
     * @param identifierValue - Value of the identifier (bib number or participant ID)
     * @param time - Time value (in decimal seconds)
     * @param addT0 - Whether to add T0 (start time offset)
     */
    async addManual(timingPoint, identifierName, identifierValue, time, addT0 = false) {
        const params = {
            timingPoint,
            [identifierName]: identifierValue,
            time,
            addT0
        };
        await this.eventApi.get('rawdata/addmanual', params);
    }
}
exports.RawDataApi = RawDataApi;
//# sourceMappingURL=rawdata.js.map