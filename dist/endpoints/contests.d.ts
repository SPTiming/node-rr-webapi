/**
 * Contests API endpoints for RaceResult Web API
 */
export declare class ContestsApi {
    private eventApi;
    constructor(eventApi: any);
    /**
     * Get all contests
     */
    list(): Promise<any[]>;
    /**
     * Get contest by ID
     */
    getById(id: number): Promise<any>;
    /**
     * Create new contest
     */
    create(contestData: any): Promise<any>;
    /**
     * Update contest
     */
    update(id: number, contestData: any): Promise<any>;
    /**
     * Delete contest
     */
    delete(id: number): Promise<void>;
    /**
     * Save contest (create or update)
     * @param contest - Contest data object
     * @param version - Version number for optimistic locking
     * @returns Contest ID of the saved contest
     */
    save(contest: any, version?: number): Promise<number>;
    /**
     * Get contests as PDF
     */
    getPdf(): Promise<Buffer>;
}
//# sourceMappingURL=contests.d.ts.map