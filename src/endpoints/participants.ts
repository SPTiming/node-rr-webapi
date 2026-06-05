/**
 * Participants API endpoints for RaceResult Web API
 */

export interface Identifier {
  [key: string]: number;
}

/** Response from part/new (v2). Field names may include PID, Bib, or ID depending on API version. */
export interface ParticipantNewResponse {
  /** Participant database id */
  PID?: number;
  /** Assigned bib */
  Bib?: number;
  ID?: number;
  [key: string]: unknown;
}

export class ParticipantsApi {
  constructor(private eventApi: any) {}

  /**
   * Get fields of one participant
   * @param identifier - Object with identifier name and value (e.g., { PID: 123 } or { Bib: 456 })
   * @param fields - Array of field names to retrieve
   * @returns Promise with participant field values
   */
  async getFields(identifier: Identifier, fields: string[]): Promise<any> {
    // Build parameters - identifier name and value are separate parameters
    const params: Record<string, any> = {};
    
    // Add identifier to parameters (use lowercase for parameter names)
    for (const [key, value] of Object.entries(identifier)) {
      params[key.toLowerCase()] = value;
    }
    
    // Add fields as JSON-encoded array (like Go does)
    if (fields && fields.length > 0) {
      params.fields = JSON.stringify(fields);
    }
    
    return this.eventApi.get('part/getfields', params);
  }

  /**
   * Get participant by ID
   */
  async getById(id: number): Promise<any> {
    return this.eventApi.get(`participants/${id}`);
  }

  /**
   * Create new participant
   */
  async create(participantData: any): Promise<any> {
    return this.eventApi.post('participants', undefined, participantData);
  }

  /**
   * Update participant
   */
  async update(id: number, participantData: any): Promise<any> {
    return this.eventApi.post(`participants/${id}`, undefined, participantData);
  }

  /**
   * Delete participant by ID
   */
  async delete(id: number): Promise<void> {
    await this.eventApi.post(`participants/${id}/delete`);
  }

  /**
   * Delete participants by filter (bulk delete)
   * @param filter - Filter expression for participants to delete
   * @param bib - Specific bib number to delete (alternative to filter) 
   * @param version - Version for optimistic locking
   */
  async deleteByFilter(filter: string, bib: number = 0, version: number = 0): Promise<void> {
    const params = {
      filter,
      bib,
      version
    };
    await this.eventApi.get('part/delete', params);
  }

  /**
   * Create a new participant with automatic bib (GET part/new, same as Go Participants.New).
   * Use bib=0 and firstFree=true to let the server assign the next free bib; response includes new PID/ID and Bib.
   */
  async newParticipant(
    contest: number,
    firstFree: boolean = true,
    preferredBib: number = 0
  ): Promise<ParticipantNewResponse> {
    return this.eventApi.get('part/new', {
      bib: preferredBib,
      contest,
      firstfree: firstFree,
      v2: true,
    }) as Promise<ParticipantNewResponse>;
  }

  /**
   * Save multiple participants
   * @param participants - Array of participant data objects
   * @param noHistory - Whether to skip adding entries to the history
   */
  async save(participants: any[], noHistory: boolean = false): Promise<void> {
    const params = {
      noHistory
    };
    await this.eventApi.post('part/savefields', params, participants);
  }
}
