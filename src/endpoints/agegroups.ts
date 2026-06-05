/**
 * Age Groups API endpoints for RaceResult Web API
 */

import type { Identifier } from './participants';

export interface AgeGroup {
  [key: string]: unknown;
}

export class AgeGroupsApi {
  constructor(private eventApi: any) {}

  /**
   * Get age groups as PDF
   */
  async getPdf(): Promise<Buffer> {
    return this.eventApi.get('agegroups/pdf');
  }

  /**
   * Get age groups matching the given filters
   */
  async get(contest: number, set: number, name: string = ''): Promise<AgeGroup[]> {
    const response = await this.eventApi.get('agegroups/get', { contest, set, name });
    return Array.isArray(response) ? response : [];
  }

  /**
   * Delete age groups
   */
  async delete(id: number, contest: number, set: number): Promise<void> {
    await this.eventApi.get('agegroups/delete', { id, contest, set });
  }

  /**
   * Save age groups and return the age group IDs
   */
  async save(items: AgeGroup[]): Promise<number[]> {
    const response = await this.eventApi.post('agegroups/save', undefined, items);
    if (Array.isArray(response)) {
      return response.map((id) => parseInt(String(id), 10));
    }
    return [];
  }

  /**
   * Generate new age groups from templates
   */
  async generate(
    mode: string,
    contest: number,
    set: number,
    ageBase: boolean,
    date: string | Date,
    lang: string
  ): Promise<AgeGroup[]> {
    const dateParam = date instanceof Date ? date.toISOString() : date;
    const response = await this.eventApi.get('agegroups/generate', {
      mode,
      contest,
      set,
      ageBase,
      date: dateParam,
      lang,
    });
    return Array.isArray(response) ? response : [];
  }

  /**
   * Reassign age groups
   */
  async reassign(
    contest: number,
    identifier: Identifier,
    set: number,
    addOnly: boolean
  ): Promise<void> {
    const params: Record<string, unknown> = { contest, set, addOnly };
    for (const [key, value] of Object.entries(identifier)) {
      params[key.toLowerCase()] = value;
    }
    await this.eventApi.get('agegroups/reassign', params);
  }
}
