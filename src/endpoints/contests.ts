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
   * Save contest (create or update)
   * @param contest - Contest data object  
   * @param version - Version number for optimistic locking
   * @returns Contest ID of the saved contest
   */
  async save(contest: any, version: number = 0): Promise<number> {
    const data = { ...contest };
    if (version > 0) {
      data.Version = version;
    }
    
    const response = await this.eventApi.post('contests/save', undefined, data);
    return parseInt(String(response), 10);
  }

  /**
   * Get contests as PDF
   */
  async getPdf(): Promise<Buffer> {
    return this.eventApi.get('contests/pdf');
  }
}
