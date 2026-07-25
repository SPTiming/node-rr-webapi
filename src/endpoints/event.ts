/**
 * Event API endpoints for RaceResult Web API
 */

import { DataApi } from './data';
import { ParticipantsApi } from './participants';
import { ContestsApi } from './contests';
import { RawDataApi } from './rawdata';
import { AgeGroupsApi } from './agegroups';
import { ResultsApi } from './results';
import { SimpleApi } from './simpleapi';
import { WebHooksApi } from './webhooks';
import { RankingsApi } from './rankings';

export class EventApi {
  private _data: DataApi;
  private _participants: ParticipantsApi;
  private _contests: ContestsApi;
  private _rawData: RawDataApi;
  private _ageGroups: AgeGroupsApi;
  private _results: ResultsApi;
  private _simpleApi: SimpleApi;
  private _webhooks: WebHooksApi;
  private _rankings: RankingsApi;

  constructor(
    private eventId: string,
    private api: any
  ) {
    this._data = new DataApi(this);
    this._participants = new ParticipantsApi(this);
    this._contests = new ContestsApi(this);
    this._rawData = new RawDataApi(this);
    this._ageGroups = new AgeGroupsApi(this);
    this._results = new ResultsApi(this);
    this._simpleApi = new SimpleApi(this);
    this._webhooks = new WebHooksApi(this);
    this._rankings = new RankingsApi(this);
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
   * Get age groups endpoints
   */
  ageGroups(): AgeGroupsApi {
    return this._ageGroups;
  }

  /**
   * Get results endpoints
   */
  results(): ResultsApi {
    return this._results;
  }

  /**
   * Get SimpleAPI endpoints
   */
  simpleApi(): SimpleApi {
    return this._simpleApi;
  }

  /**
   * Get WebHooks endpoints
   */
  webhooks(): WebHooksApi {
    return this._webhooks;
  }

  /**
   * Get Rankings endpoints
   */
  rankings(): RankingsApi {
    return this._rankings;
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
   * Execute multiple requests in a single call using server-side batching
   * 
   * @param requests Array of request URIs (e.g., ["contests/get", "data/count", "part/getfields?bib=1&fields=[\"FirstName\"]"])
   * @returns Object with results for each request, keyed by request URI
   */
  async multiRequest(requests: string[]): Promise<Record<string, any>> {
    // Go format: send requests array directly with explicit JSON content type
    return this.post('multirequest', undefined, requests, 'application/json');
  }
}
