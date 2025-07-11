/**
 * Contests API endpoints for RaceResult Web API
 */

export class ContestsApi {
  constructor(private eventApi: any) {}

  /**
   * Get all contests
   */
  async list(): Promise<any[]> {
    const response = await this.eventApi.get('contests/get');
    return Array.isArray(response) ? response : [];
  }

  /**
   * Get contest by ID
   */
  async getById(id: number): Promise<any> {
    return this.eventApi.get('contests/get', { id });
  }

  /**
   * Create new contest
   */
  async create(contestData: any): Promise<any> {
    return this.eventApi.post('contests/save', undefined, contestData);
  }

  /**
   * Update contest
   */
  async update(id: number, contestData: any): Promise<any> {
    return this.eventApi.post('contests/save', { oldID: id }, contestData);
  }

  /**
   * Delete contest
   */
  async delete(id: number): Promise<void> {
    await this.eventApi.get('contests/delete', { id });
  }

  /**
   * Get contests as PDF
   */
  async getPdf(): Promise<Buffer> {
    return this.eventApi.get('contests/pdf');
  }
}
