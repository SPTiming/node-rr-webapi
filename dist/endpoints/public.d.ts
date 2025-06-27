/**
 * Public API endpoints for RaceResult Web API
 */
import { LoginCredentials, EventListItem, UserInfo } from '../types';
export declare class PublicApi {
    private api;
    constructor(api: any);
    /**
     * Login with API key or username/password
     */
    login(credentials: LoginCredentials): Promise<void>;
    /**
     * Logout and clear session
     */
    logout(): Promise<void>;
    /**
     * Get current session ID
     */
    getSessionId(): string;
    /**
     * Get user information
     */
    userInfo(): Promise<UserInfo>;
    /**
   * Get list of events
   */
    eventList(): Promise<EventListItem[]>;
    /**
     * Create a new event
     */
    createEvent(eventData: any): Promise<string>;
    /**
     * Delete an event
     */
    deleteEvent(eventId: string): Promise<void>;
}
//# sourceMappingURL=public.d.ts.map