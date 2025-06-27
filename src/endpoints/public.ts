/**
 * Public API endpoints for RaceResult Web API
 */

import { LoginCredentials, EventListItem, UserInfo } from '../types';

export class PublicApi {
  constructor(private api: any) {}

  /**
   * Login with API key or username/password
   */
  async login(credentials: LoginCredentials): Promise<void> {
    let data: any = {};

    if (credentials.apiKey) {
      data.apikey = credentials.apiKey;
    } else if (credentials.username && credentials.password) {
      data.user = credentials.username;
      data.pw = credentials.password;
    } else {
      throw new Error('Either apiKey or username/password must be provided');
    }

    // Use the correct endpoint and content type
    const response = await this.api.post('', 'public/login', undefined, data, 'application/x-www-form-urlencoded');

    // Extract session ID from response
    if (typeof response === 'string' && response.length > 0) {
      this.api.setSessionId(response);
    } else {
      throw new Error('Login failed: No session ID received');
    }
  }

  /**
   * Logout and clear session
   */
  async logout(): Promise<void> {
    await this.api.get('', 'public/logout');
    this.api.setSessionId('');
  }

  /**
   * Get current session ID
   */
  getSessionId(): string {
    return this.api.getSessionId();
  }

  /**
   * Get user information
   */
  async userInfo(): Promise<UserInfo> {
    return this.api.get('', 'public/userinfo');
  }

    /**
   * Get list of events
   */
  async eventList(): Promise<EventListItem[]> {
    const params = {
      year: 0,
      filter: '',
      addsettings: 'EventName,EventDate,EventDate2,EventLocation,EventCountry'
    };
    
    const response = await this.api.get('', 'public/eventlist', params);
    
    // Convert response to EventListItem array
    if (Array.isArray(response)) {
      return response.map((item: any) => ({
        id: String(item.ID || ''),
        event_name: item.EventName || '',
        event_date: item.EventDate ? new Date(item.EventDate) : null,
        participants: item.Participants || 0,
        ...item,
      }));
    }
    
    return [];
  }

  /**
   * Create a new event
   */
  async createEvent(eventData: any): Promise<string> {
    return this.api.post('', 'createevent', undefined, eventData);
  }

  /**
   * Delete an event
   */
  async deleteEvent(eventId: string): Promise<void> {
    await this.api.post('', 'deleteevent', { eventid: eventId });
  }
}
