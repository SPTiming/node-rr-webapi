/**
 * Data API endpoints for RaceResult Web API
 */

// DataListParams type is available but not used in this implementation

export class DataApi {
  constructor(private eventApi: any) {}

  /**
   * Get count of participants matching filter
   */
  async count(filter: string = ''): Promise<number> {
    const params = filter ? { filter } : {};
    const response = await this.eventApi.get('data/count', params);
    return parseInt(String(response), 10);
  }

  /**
   * Get list of data records
   */
  async list(
    fields: string[],
    filter: string = '',
    sortFields?: string[],
    offset: number = 0,
    limit: number = 0,
    groupBy?: string[],
    having: string = '',
    distinct: string = ''
  ): Promise<any[]> {
    // Format fields as JSON array string (like in the web app)
    const fieldsJson = JSON.stringify(fields);

    const params: Record<string, any> = {
      lang: 'en',
      fields: fieldsJson,
      filter,
      filterbib: 0,
      filtercontest: 0,
      filtersex: '',
      sort: sortFields?.[0] || '',
      listformat: 'jSON',
      pw: 0,
    };

    if (offset > 0) {
      params.offset = offset;
    }
    if (limit > 0) {
      params.limit = limit;
    }
    if (groupBy && groupBy.length > 0) {
      params.groupby = groupBy.join(',');
    }
    if (having) {
      params.having = having;
    }
    if (distinct) {
      params.distinct = distinct;
    }

    const response = await this.eventApi.get('data/list', params);
    return Array.isArray(response) ? response : [];
  }

  /**
   * Get participant data with simplified parameters
   */
  async getParticipants(
    options: {
      filter?: string;
      sort?: string;
      offset?: number;
      limit?: number;
    } = {}
  ): Promise<any[]> {
    return this.list(
      ['ID', 'BIB', 'FIRSTNAME', 'LASTNAME', 'CONTEST.NAME'],
      options.filter || '',
      options.sort ? [options.sort] : ['BIB'],
      options.offset || 0,
      options.limit || 0
    );
  }

  /**
   * Find participant by bib number
   */
  async getParticipantByBib(bib: number): Promise<any | null> {
    const participants = await this.list(
      ['ID', 'BIB', 'FIRSTNAME', 'LASTNAME', 'CONTEST.NAME'],
      `[BIB]=${bib}`,
      ['BIB'],
      0,
      1
    );

    return participants.length > 0 ? participants[0] : null;
  }
}
