/**
 * TeamScores endpoints for RaceResult Web API
 */

import { TeamScore } from '../types';

export class TeamScoresApi {
  constructor(private eventApi: any) {}

  async get(): Promise<TeamScore[]> {
    const response = await this.eventApi.get('teamscores/get');
    return Array.isArray(response) ? response : [];
  }

  async getOne(id: number): Promise<TeamScore> {
    const response = await this.eventApi.get('teamscores/get', { id });
    const items = Array.isArray(response) ? response : [];
    if (items.length === 0) {
      throw new Error('team score not found');
    }
    return items[0];
  }

  async delete(id: number): Promise<void> {
    await this.eventApi.get('teamscores/delete', { id });
  }

  async save(item: TeamScore): Promise<void> {
    await this.eventApi.post('teamscores/save', undefined, item);
  }
}
