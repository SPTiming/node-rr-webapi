/**
 * Main API class for RaceResult Web API
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiConfig, ApiError, RequestConfig } from './types';
import { PublicApi } from './endpoints/public';
import { EventApi } from './endpoints/event';
import { GeneralApi } from './endpoints/general';

export class RaceResultApi {
  private readonly httpClient: AxiosInstance;
  private readonly config: Required<ApiConfig>;
  private sessionId: string = '';
  private errorGenerator?: (message: string, status: number) => Error;

  // Endpoint groups
  private _public: PublicApi;

  constructor(config: ApiConfig) {
    this.config = {
      server: config.server,
      https: config.https ?? true,
      userAgent: config.userAgent ?? 'nodejs-webapi/1.0',
      timeout: config.timeout ?? 30000,
    };

    // Create HTTP client
    this.httpClient = axios.create({
      timeout: this.config.timeout,
      headers: {
        'User-Agent': this.config.userAgent,
      },
    });

    // Initialize endpoint groups
    this._public = new PublicApi(this);
  }

  /**
   * Get the public API endpoints
   */
  public(): PublicApi {
    return this._public;
  }

  /**
   * Get an event API instance for a specific event
   */
  eventApi(eventId: string): EventApi {
    return new EventApi(eventId, this);
  }

  /**
   * Get the general API endpoints
   */
  general(): GeneralApi {
    return new GeneralApi(this);
  }

  /**
   * Set custom error generator function
   */
  setErrorGenerator(fn: (message: string, status: number) => Error): void {
    this.errorGenerator = fn;
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Set the session ID (used by login)
   */
  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  /**
   * Get the server configuration
   */
  getConfig(): Required<ApiConfig> {
    return { ...this.config };
  }

  /**
   * Build URL for API requests
   */
  buildUrl(eventId: string, endpoint: string, params?: Record<string, any>): string {
    const protocol = this.config.https ? 'https' : 'http';
    let url = `${protocol}://${this.config.server}`;

    if (eventId) {
      url += `/_${eventId}`;
    }

    url += `/api/${endpoint}`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return url;
  }

  /**
   * Make HTTP request to the API
   */
  async makeRequest<T = any>(config: RequestConfig): Promise<T> {
    const url = this.buildUrl(config.eventId || '', config.endpoint, config.params);

    const headers: Record<string, string> = {};

    // Add authorization header if we have a session
    if (this.sessionId) {
      headers['Authorization'] = `Bearer ${this.sessionId}`;
    }

    // Add content type if specified
    if (config.contentType) {
      headers['Content-Type'] = config.contentType;
    }

    try {
      const response: AxiosResponse<T> = await this.httpClient.request({
        method: config.method,
        url,
        headers,
        data: config.data,
      });

      return response.data;
    } catch (error: any) {
      const status = error.response?.status || 0;
      const message = error.response?.data?.Error || error.message || 'Request failed';

      if (this.errorGenerator) {
        throw this.errorGenerator(message, status);
      }

      const apiError: ApiError = new Error(message);
      apiError.status = status;
      apiError.response = error.response?.data;
      throw apiError;
    }
  }

  /**
   * Make GET request
   */
  async get<T = any>(eventId: string, endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>({
      method: 'GET',
      eventId,
      endpoint,
      params,
    });
  }

  /**
   * Make POST request
   */
  async post<T = any>(
    eventId: string,
    endpoint: string,
    params?: Record<string, any>,
    data?: any,
    contentType?: string
  ): Promise<T> {
    return this.makeRequest<T>({
      method: 'POST',
      eventId,
      endpoint,
      params,
      data,
      contentType,
    });
  }
} 