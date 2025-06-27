/**
 * Event API endpoints for RaceResult Web API
 */

import { DataApi } from './data';
import { ParticipantsApi } from './participants';
import { ContestsApi } from './contests';
import { RawDataApi } from './rawdata';

export class EventApi {
  private _data: DataApi;
  private _participants: ParticipantsApi;
  private _contests: ContestsApi;
  private _rawData: RawDataApi;

  constructor(
    private eventId: string,
    private api: any
  ) {
    this._data = new DataApi(this);
    this._participants = new ParticipantsApi(this);
    this._contests = new ContestsApi(this);
    this._rawData = new RawDataApi(this);
  }

  /**
   * Get the event ID
   */
  getEventId(): string {
    return this.eventId;
  }

  /**
   * Get the API instance
   */
  getApi(): any {
    return this.api;
  }

  /**
   * Get data endpoints
   */
  data(): DataApi {
    return this._data;
  }

  /**
   * Get participants endpoints
   */
  participants(): ParticipantsApi {
    return this._participants;
  }

  /**
   * Get contests endpoints
   */
  contests(): ContestsApi {
    return this._contests;
  }

  /**
   * Get raw data endpoints
   */
  rawData(): RawDataApi {
    return this._rawData;
  }

  /**
   * Make GET request to event endpoint
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.api.get(this.eventId, endpoint, params);
  }

  /**
   * Make POST request to event endpoint
   */
  async post<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    data?: any,
    contentType?: string
  ): Promise<T> {
    return this.api.post(this.eventId, endpoint, params, data, contentType);
  }

  /**
   * Execute multiple requests in parallel
   */
  async multiRequest<T = any>(
    requests: Array<{
      endpoint: string;
      params?: Record<string, any>;
      method?: 'GET' | 'POST';
      data?: any;
    }>
  ): Promise<T[]> {
    const promises = requests.map(req => {
      if (req.method === 'POST') {
        return this.post(req.endpoint, req.params, req.data);
      }
      return this.get(req.endpoint, req.params);
    });

    return Promise.all(promises);
  }
}
