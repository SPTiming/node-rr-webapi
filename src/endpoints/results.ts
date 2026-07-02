/**
 * Results API endpoints for RaceResult Web API
 */

import { Result } from '../types';

export class ResultsApi {
  constructor(private eventApi: any) {}

  /**
   * Get results matching the given filters
   */
  async get(name: string = '', onlyFormulas: boolean = false, onlyNoFormulas: boolean = false): Promise<Result[]> {
    const response = await this.eventApi.get('results/get', {
      name,
      onlyFormulas,
      onlyNoFormulas,
    });
    return Array.isArray(response) ? response : [];
  }

  /**
   * Get one result by ID
   */
  async getOne(id: number): Promise<Result> {
    return this.eventApi.get('results/get', { id });
  }

  /**
   * Delete a result by ID
   */
  async delete(id: number): Promise<void> {
    await this.eventApi.get('results/delete', { id });
  }

  /**
   * Save one or more special result definitions
   */
  async save(items: Result[]): Promise<void> {
    await this.eventApi.post('results/save', undefined, items);
  }
}
