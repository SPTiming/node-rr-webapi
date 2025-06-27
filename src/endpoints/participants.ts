/**
 * Participants API endpoints for RaceResult Web API
 */

export class ParticipantsApi {
  constructor(private eventApi: any) {}

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
