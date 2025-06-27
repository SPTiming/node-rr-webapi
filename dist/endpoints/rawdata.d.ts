/**
 * Raw Data API endpoints for RaceResult Web API
 */
import { RawDataEntry } from '../types';
export declare class RawDataApi {
    private eventApi;
    constructor(eventApi: any);
    /**
     * Get raw data by participant ID (PID)
     */
    getByPid(pid: number): Promise<RawDataEntry[]>;
    /**
     * Get raw data by bib number
     */
    getByBib(bib: number): Promise<RawDataEntry[]>;
    /**
     * Get all raw data
     */
    getAll(): Promise<RawDataEntry[]>;
    /**
     * Add raw data entry
     */
    add(rawDataEntry: Partial<RawDataEntry>): Promise<any>;
    /**
     * Update raw data entry
     */
    update(id: number, rawDataEntry: Partial<RawDataEntry>): Promise<any>;
    /**
     * Delete raw data entry
     */
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=rawdata.d.ts.map