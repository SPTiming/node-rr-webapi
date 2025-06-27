/**
 * Data API endpoints for RaceResult Web API
 */
export declare class DataApi {
    private eventApi;
    constructor(eventApi: any);
    /**
     * Get count of participants matching filter
     */
    count(filter?: string): Promise<number>;
    /**
     * Get list of data records
     */
    list(fields: string[], filter?: string, sortFields?: string[], offset?: number, limit?: number, groupBy?: string[], having?: string, distinct?: string): Promise<any[]>;
    /**
     * Get participant data with simplified parameters
     */
    getParticipants(options?: {
        filter?: string;
        sort?: string;
        offset?: number;
        limit?: number;
    }): Promise<any[]>;
    /**
     * Find participant by bib number
     */
    getParticipantByBib(bib: number): Promise<any | null>;
}
//# sourceMappingURL=data.d.ts.map