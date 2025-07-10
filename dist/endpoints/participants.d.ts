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
     * Delete participant
     */
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=participants.d.ts.map