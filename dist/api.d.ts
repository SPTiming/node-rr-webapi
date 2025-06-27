/**
 * Main API class for RaceResult Web API
 */
import { ApiConfig, RequestConfig } from './types';
import { PublicApi } from './endpoints/public';
import { EventApi } from './endpoints/event';
import { GeneralApi } from './endpoints/general';
export declare class RaceResultApi {
    private readonly httpClient;
    private readonly config;
    private sessionId;
    private errorGenerator?;
    private _public;
    constructor(config: ApiConfig);
    /**
     * Get the public API endpoints
     */
    public(): PublicApi;
    /**
     * Get an event API instance for a specific event
     */
    eventApi(eventId: string): EventApi;
    /**
     * Get the general API endpoints
     */
    general(): GeneralApi;
    /**
     * Set custom error generator function
     */
    setErrorGenerator(fn: (message: string, status: number) => Error): void;
    /**
     * Get the current session ID
     */
    getSessionId(): string;
    /**
     * Set the session ID (used by login)
     */
    setSessionId(sessionId: string): void;
    /**
     * Get the server configuration
     */
    getConfig(): Required<ApiConfig>;
    /**
     * Build URL for API requests
     */
    buildUrl(eventId: string, endpoint: string, params?: Record<string, any>): string;
    /**
     * Make HTTP request to the API
     */
    makeRequest<T = any>(config: RequestConfig): Promise<T>;
    /**
     * Make GET request
     */
    get<T = any>(eventId: string, endpoint: string, params?: Record<string, any>): Promise<T>;
    /**
     * Make POST request
     */
    post<T = any>(eventId: string, endpoint: string, params?: Record<string, any>, data?: any, contentType?: string): Promise<T>;
}
//# sourceMappingURL=api.d.ts.map