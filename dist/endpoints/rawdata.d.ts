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
    /**
     * Add a raw data entry manually
     * @param timingPoint - Name of the timing point
     * @param identifierName - Type of identifier ('bib' or 'pid')
     * @param identifierValue - Value of the identifier (bib number or participant ID)
     * @param time - Time value (in decimal seconds)
     * @param addT0 - Whether to add T0 (start time offset)
     */
    addManual(timingPoint: string, identifierName: 'bib' | 'pid', identifierValue: number, time: number, addT0?: boolean): Promise<void>;
}
//# sourceMappingURL=rawdata.d.ts.map