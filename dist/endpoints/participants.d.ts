/**
 * Participants API endpoints for RaceResult Web API
 */
export declare class ParticipantsApi {
    private eventApi;
    constructor(eventApi: any);
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