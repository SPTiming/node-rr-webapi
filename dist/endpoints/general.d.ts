/**
 * General API endpoints for RaceResult Web API
 */
export declare class GeneralApi {
    private api;
    constructor(api: any);
    /**
     * Get API version information
     */
    version(): Promise<any>;
    /**
     * Health check endpoint
     */
    ping(): Promise<string>;
    /**
     * Get server time
     */
    serverTime(): Promise<any>;
}
//# sourceMappingURL=general.d.ts.map