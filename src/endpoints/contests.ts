/**
 * Contests API endpoints for RaceResult Web API
 */

export class ContestsApi {
  constructor(private eventApi: any) {}

  /**
   * Get all contests
   */
  async list(): Promise<any[]> {
    const response = await this.eventApi.get('contests');
    return Array.isArray(response) ? response : [];
  }

  /**
   * Get contest by ID
   */
  async getById(id: number): Promise<any> {
    return this.eventApi.get(`contests/${id}`);
  }

  /**
   * Create new contest
   */
  async create(contestData: any): Promise<any> {
    return this.eventApi.post('contests', undefined, contestData);
  }

  /**
   * Update contest
   */
  async update(id: number, contestData: any): Promise<any> {
    return this.eventApi.post(`contests/${id}`, undefined, contestData);
  }

  /**
   * Delete contest
   */
  async delete(id: number): Promise<void> {
    await this.eventApi.post(`contests/${id}/delete`);
  }
}
