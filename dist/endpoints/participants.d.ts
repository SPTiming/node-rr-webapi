/**
 * Participants API endpoints for RaceResult Web API
 */
export interface Identifier {
    [key: string]: number;
}
export declare class ParticipantsApi {
    private eventApi;
    constructor(eventApi: any);
    /**
     * Get fields of one participant
     * @param identifier - Object with identifier name and value (e.g., { PID: 123 } or { Bib: 456 })
     * @param fields - Array of field names to retrieve
     * @returns Promise with participant field values
     */
    getFields(identifier: Identifier, fields: string[]): Promise<any>;
    /**
     * Get participant by ID
     */
    getById(id: number): Promise<any>;
    /**
     * Create new participant
     */
    create(participantData: any): Promise<any>;
    /**
     * Update participant
     */
    update(id: number, participantData: any): Promise<any>;
    /**
     * Delete participant by ID
     */
    delete(id: number): Promise<void>;
    /**
     * Delete participants by filter (bulk delete)
     * @param filter - Filter expression for participants to delete
     * @param bib - Specific bib number to delete (alternative to filter)
     * @param version - Version for optimistic locking
     */
    deleteByFilter(filter: string, bib?: number, version?: number): Promise<void>;
    /**
     * Save multiple participants
     * @param participants - Array of participant data objects
     * @param noHistory - Whether to skip adding entries to the history
     */
    save(participants: any[], noHistory?: boolean): Promise<void>;
}
//# sourceMappingURL=participants.d.ts.map