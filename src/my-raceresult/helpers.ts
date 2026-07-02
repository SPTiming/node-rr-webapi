/**
 * Helpers for my.raceresult.com portal list responses
 */

import { FlatListRow, ListResponse } from './types';

function isRowArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0 && Array.isArray(value[0]);
}

function walkData(
  node: unknown,
  groupPath: string[],
  fields: string[],
  rows: FlatListRow[]
): void {
  if (isRowArray(node)) {
    for (const row of node) {
      const flat: FlatListRow = { _group: groupPath.join(' > ') };
      const values = row as unknown[];
      for (let i = 0; i < fields.length; i++) {
        flat[fields[i]] = values[i] as string | number | boolean | null | undefined;
      }
      rows.push(flat);
    }
    return;
  }

  if (node && typeof node === 'object' && !Array.isArray(node)) {
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      walkData(value, [...groupPath, key], fields, rows);
    }
  }
}

/**
 * Flatten nested grouped list data into row objects keyed by DataFields.
 */
export function flattenListRows(response: ListResponse): FlatListRow[] {
  const fields = response.DataFields ?? [];
  const rows: FlatListRow[] = [];
  walkData(response.data, [], fields, rows);
  return rows;
}
