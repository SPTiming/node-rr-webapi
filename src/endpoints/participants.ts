/**
 * Participants API endpoints for RaceResult Web API
 */

import {
  EntryFeeItem,
  Identifier,
  ImportResult,
  ParticipantNewResponse,
  SaveValueArrayItem,
} from '../types';

function identifierParams(identifier: Identifier): Record<string, number> {
  const params: Record<string, number> = {};
  for (const [key, value] of Object.entries(identifier)) {
    params[key.toLowerCase()] = value;
  }
  return params;
}

function intSliceToString(ints: number[]): string {
  return ints.join(',');
}

export class ParticipantsApi {
  constructor(private eventApi: any) {}

  /**
   * Get fields of one participant
   */
  async getFields(identifier: Identifier, fields: string[]): Promise<Record<string, unknown>> {
    const params: Record<string, unknown> = {
      ...identifierParams(identifier),
    };
    if (fields.length > 0) {
      params.fields = JSON.stringify(fields);
    }
    return this.eventApi.get('part/getfields', params);
  }

  /**
   * Preview field values after applying changes without saving
   */
  async getFieldsWithChanges(
    identifier: Identifier,
    fields: string[],
    changes: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const params: Record<string, unknown> = {
      ...identifierParams(identifier),
    };
    if (fields.length > 0) {
      params.fields = JSON.stringify(fields);
    }
    return this.eventApi.post('part/getfieldswithchanges', params, changes);
  }

  /**
   * Calculate an expression and save it in the given field
   */
  async saveExpression(
    identifier: Identifier,
    field: string,
    expression: string,
    noHistory: boolean = false
  ): Promise<void> {
    await this.eventApi.get('part/saveexpression', {
      ...identifierParams(identifier),
      field,
      expression,
      noHistory,
    });
  }

  /**
   * Save multiple values for possibly different participants in one call
   */
  async saveValueArray(values: SaveValueArrayItem[], noHistory: boolean = false): Promise<void> {
    await this.eventApi.post('part/savevaluearray', { noHistory }, values);
  }

  /**
   * Save multiple fields for one participant
   */
  async saveFields(
    identifier: Identifier,
    values: Record<string, unknown>,
    noHistory: boolean = false
  ): Promise<void> {
    await this.eventApi.post('part/savefields', {
      ...identifierParams(identifier),
      noHistory,
    }, values);
  }

  /**
   * Add or update one or more participants
   */
  async save(participants: Record<string, unknown>[], noHistory: boolean = false): Promise<void> {
    await this.eventApi.post('part/savefields', { noHistory }, participants);
  }

  /**
   * Delete participants matching the given filters
   */
  async delete(filter: string, identifier: Identifier, contest: number = 0): Promise<void> {
    await this.eventApi.get('part/delete', {
      filter,
      ...identifierParams(identifier),
      contest,
    });
  }

  /**
   * Create a new participant and return the assigned bib/PID
   */
  async newParticipant(
    bib: number,
    contest: number,
    firstFree: boolean = false
  ): Promise<ParticipantNewResponse> {
    return this.eventApi.get('part/new', {
      bib,
      contest,
      firstfree: firstFree,
      v2: true,
    }) as Promise<ParticipantNewResponse>;
  }

  /**
   * Get entry fees charged to the participants with the given bibs
   */
  async entryFee(bibs: number[]): Promise<EntryFeeItem[]> {
    const response = await this.eventApi.get('part/entryfee', {
      bibs: intSliceToString(bibs),
    });
    return Array.isArray(response) ? response : [];
  }

  /**
   * Create blank participants
   */
  async createBlanks(from: number, to: number, contest: number, skipExcluded: boolean = false): Promise<void> {
    await this.eventApi.get('part/clearbankinformation', {
      from,
      to,
      contest,
      skipExcluded,
    });
  }

  /**
   * Swap the bibs of two participants
   */
  async swapBibs(bib1: number, bib2: number): Promise<void> {
    await this.eventApi.get('part/swapbibs', { bib1, bib2 });
  }

  /**
   * Assign new bibs
   */
  async resetBibs(
    sort: string,
    firstBib: number,
    ranges: boolean,
    filter: string,
    noHistory: boolean = false
  ): Promise<void> {
    await this.eventApi.get('part/resetbibs', {
      sort,
      firstBib,
      ranges,
      filter,
      noHistory,
    });
  }

  /**
   * Change multiple participants at the same time
   */
  async dataManipulation(
    values: Record<string, string>,
    filter: string,
    noHistory: boolean = false
  ): Promise<void> {
    await this.eventApi.post('part/datamanipulation', { filter, noHistory }, values);
  }

  /**
   * Remove banking information for participants matching the given filters
   */
  async clearBankInformation(identifier: Identifier, contest: number, filter: string): Promise<void> {
    await this.eventApi.get('part/clearbankinformation', {
      ...identifierParams(identifier),
      contest,
      filter,
    });
  }

  /**
   * Import an entire SES file into the current event file
   */
  async importSes(
    file: Buffer | Uint8Array,
    options: {
      filter?: string;
      identity?: string;
      addParticipants?: boolean;
      updateParticipants?: boolean;
      contestFrom?: number;
      contestTo?: number;
      timesFrom?: number;
      timesTo?: number;
      importRawData?: boolean;
    } = {}
  ): Promise<ImportResult> {
    const {
      filter = '',
      identity = '',
      addParticipants = false,
      updateParticipants = false,
      contestFrom = 0,
      contestTo = 0,
      timesFrom = 0,
      timesTo = 0,
      importRawData = false,
    } = options;

    return this.eventApi.post('part/importses', {
      filter,
      identity,
      addParticipants,
      updateParticipants,
      contestFrom,
      contestTo,
      timesFrom,
      timesTo,
      importRawData,
    }, file);
  }

  /**
   * Import participants from a csv/xls/xlsx file
   */
  async import(
    file: Buffer | Uint8Array,
    addParticipants: boolean = false,
    updateParticipants: boolean = false,
    colHandling: number = 0,
    identityColumns: number = 0,
    lang: string = ''
  ): Promise<ImportResult> {
    return this.eventApi.post('part/import', {
      addParticipants,
      updateParticipants,
      colHandling,
      identityColumns,
      lang,
    }, file);
  }

  /**
   * Return an unused bib
   */
  async freeBib(maxBibPlus1: boolean, contest: number, preferred: number = 0): Promise<number> {
    const response = await this.eventApi.get('part/freebib', {
      maxBibPlus1,
      contest,
      preferred,
    });
    return typeof response === 'number' ? response : parseInt(String(response), 10);
  }

  /**
   * Return the most frequent clubs containing the given wildcard
   */
  async frequentClubs(wildcard: string, maxNumber: number): Promise<string[]> {
    const response = await this.eventApi.get('part/frequentclubs', {
      wildcard,
      maxNumber,
    });
    return Array.isArray(response) ? response : [];
  }
}
