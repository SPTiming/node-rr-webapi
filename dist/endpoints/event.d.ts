/**
 * Event API endpoints for RaceResult Web API
 */
import { DataApi } from './data';
import { ParticipantsApi } from './participants';
import { ContestsApi } from './contests';
import { RawDataApi } from './rawdata';
export declare class EventApi {
    private eventId;
    private api;
    private _data;
    private _participants;
    private _contests;
    private _rawData;
    constructor(eventId: string, api: any);
    /**
     * Get the event ID
     */
    getEventId(): string;
    /**
     * Get the API instance
     */
    getApi(): any;
    /**
     * Get data endpoints
     */
    data(): DataApi;
    /**
     * Get participants endpoints
     */
    participants(): ParticipantsApi;
    /**
     * Get contests endpoints
     */
    contests(): ContestsApi;
    /**
     * Get raw data endpoints
     */
    rawData(): RawDataApi;
    /**
     * Make GET request to event endpoint
     */
    get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T>;
    /**
     * Make POST request to event endpoint
     */
    post<T = any>(endpoint: string, params?: Record<string, any>, data?: any, contentType?: string): Promise<T>;
    /**
     * Execute multiple requests in a single call using server-side batching
     *
     * @param requests Array of request URIs (e.g., ["contests/get", "data/count", "part/getfields?bib=1&fields=[\"FirstName\"]"])
     * @returns Object with results for each request, keyed by request URI
     */
    multiRequest(requests: string[]): Promise<Record<string, any>>;
}
//# sourceMappingURL=event.d.ts.map