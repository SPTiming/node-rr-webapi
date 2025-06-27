/**
 * Raw Data API endpoints for RaceResult Web API
 */

import { RawDataEntry } from '../types';

export class RawDataApi {
  constructor(private eventApi: any) {}

  /**
   * Get raw data by participant ID (PID)
   */
  async getByPid(pid: number): Promise<RawDataEntry[]> {
    const params = {
      pid,
      filter: '',
      rdFilter: '{}',
      addFields: [],
      firstRow: 0,
      maxRows: 0,
      sortBy: ''
    };
    const response = await this.eventApi.get('rawdata/get', params);
    return Array.isArray(response) ? response : [];
  }

  /**
   * Get raw data by bib number
   */
  async getByBib(bib: number): Promise<RawDataEntry[]> {
    const params = {
      bib,
      filter: '',
      rdFilter: '{}',
      addFields: [],
      firstRow: 0,
      maxRows: 0,
      sortBy: ''
    };
    const response = await this.eventApi.get('rawdata/get', params);
    return Array.isArray(response) ? response : [];
  }

  /**
   * Get all raw data
   */
  async getAll(): Promise<RawDataEntry[]> {
    const response = await this.eventApi.get('rawdata');
    return Array.isArray(response) ? response : [];
  }

  /**
   * Add raw data entry
   */
  async add(rawDataEntry: Partial<RawDataEntry>): Promise<any> {
    return this.eventApi.post('rawdata', undefined, rawDataEntry);
  }

  /**
   * Update raw data entry
   */
  async update(id: number, rawDataEntry: Partial<RawDataEntry>): Promise<any> {
    return this.eventApi.post(`rawdata/${id}`, undefined, rawDataEntry);
  }

  /**
   * Delete raw data entry
   */
  async delete(id: number): Promise<void> {
    await this.eventApi.post(`rawdata/${id}/delete`);
  }
}
