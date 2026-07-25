/**
 * Rankings endpoints for RaceResult Web API
 */

import { Ranking } from '../types';

export class RankingsApi {
  constructor(private eventApi: any) {}

  async get(): Promise<Ranking[]> {
    const response = await this.eventApi.get('ranks/get');
    return Array.isArray(response) ? response : [];
  }

  async getOne(id: number): Promise<Ranking> {
    return this.eventApi.get('ranks/get', { id });
  }

  async delete(id: number): Promise<void> {
    await this.eventApi.get('ranks/delete', { id });
  }

  async save(items: Ranking[]): Promise<number[]> {
    const response = await this.eventApi.post('ranks/save', undefined, items);
    return Array.isArray(response) ? response : [];
  }
}
