/**
 * General API endpoints for RaceResult Web API
 */

export class GeneralApi {
  constructor(private api: any) {}

  /**
   * Get API version information
   */
  async version(): Promise<any> {
    return this.api.get('', 'version');
  }

  /**
   * Health check endpoint
   */
  async ping(): Promise<string> {
    return this.api.get('', 'ping');
  }

  /**
   * Get server time
   */
  async serverTime(): Promise<any> {
    return this.api.get('', 'servertime');
  }
}
