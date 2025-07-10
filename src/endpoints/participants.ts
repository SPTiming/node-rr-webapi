/**
 * Participants API endpoints for RaceResult Web API
 */

export interface Identifier {
  [key: string]: number;
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
   * Delete participant
   */
  async delete(id: number): Promise<void> {
    await this.eventApi.post(`participants/${id}/delete`);
  }
}
