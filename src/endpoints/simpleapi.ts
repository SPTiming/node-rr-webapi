/**
 * SimpleAPI endpoints for RaceResult Web API
 */

import { randomBytes } from 'crypto';
import { SimpleAPIItem } from '../types';

const SIMPLE_API_KEY_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateSimpleApiKey(): string {
  const bytes = randomBytes(32);
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += SIMPLE_API_KEY_CHARS[bytes[i] % SIMPLE_API_KEY_CHARS.length];
  }
  return key;
}

export interface SimpleAPIAddInput {
  url: string;
  label?: string;
  key?: string;
  disabled?: boolean;
}

export class SimpleApi {
  constructor(private eventApi: any) {}

  async get(): Promise<SimpleAPIItem[]> {
    const response = await this.eventApi.get('simpleapi/get');
    return Array.isArray(response) ? response : [];
  }

  async save(items: SimpleAPIItem[]): Promise<void> {
    await this.eventApi.post('simpleapi/save', undefined, items);
  }

  async saveAll(items: SimpleAPIItem[]): Promise<void> {
    await this.eventApi.post('simpleapi/saveall', undefined, items);
  }

  async delete(key: string): Promise<void> {
    await this.eventApi.get('simpleapi/delete', { key });
  }

  async appendEndpoint(input: SimpleAPIAddInput): Promise<SimpleAPIItem> {
    const existing = await this.get();
    const newItem: SimpleAPIItem = {
      Key: input.key ?? generateSimpleApiKey(),
      URL: input.url,
      Label: input.label ?? '',
      Disabled: input.disabled ?? false,
    };
    await this.saveAll([...existing, newItem]);
    return newItem;
  }

  /** @deprecated Use appendEndpoint — save() only works for webhooks; append uses saveAll */
  async add(input: SimpleAPIAddInput): Promise<SimpleAPIItem> {
    return this.appendEndpoint(input);
  }

  private async setEndpointsDisabled(
    disabled: boolean,
    indexes?: number[]
  ): Promise<SimpleAPIItem[]> {
    const items = await this.get();
    const targetIndexes =
      indexes === undefined ? items.map((_, i) => i) : indexes;

    for (const i of targetIndexes) {
      if (i < 0 || i >= items.length) {
        throw new Error(`Index out of range: ${i} (list length: ${items.length})`);
      }
      items[i] = { ...items[i], Disabled: disabled };
    }

    await this.saveAll(items);
    return items;
  }

  async enableEndpoints(indexes?: number[]): Promise<SimpleAPIItem[]> {
    return this.setEndpointsDisabled(false, indexes);
  }

  async disableEndpoints(indexes?: number[]): Promise<SimpleAPIItem[]> {
    return this.setEndpointsDisabled(true, indexes);
  }
}
