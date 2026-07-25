/**
 * WebHooks endpoints for RaceResult Web API
 */

import { WebHook } from '../types';

export class WebHooksApi {
  constructor(private eventApi: any) {}

  async get(): Promise<WebHook[]> {
    const response = await this.eventApi.get('webhooks/get');
    return Array.isArray(response) ? response : [];
  }

  async save(items: WebHook[]): Promise<number[]> {
    const response = await this.eventApi.post('webhooks/save', undefined, items);
    return Array.isArray(response) ? response : [];
  }

  async delete(id: number): Promise<void> {
    await this.eventApi.get('webhooks/delete', { id });
  }

  private async setWebhooksDisabled(
    disabled: boolean,
    indexes?: number[]
  ): Promise<WebHook[]> {
    const items = await this.get();
    const targetIndexes =
      indexes === undefined ? items.map((_, i) => i) : indexes;

    for (const i of targetIndexes) {
      if (i < 0 || i >= items.length) {
        throw new Error(`Index out of range: ${i} (list length: ${items.length})`);
      }
      items[i] = { ...items[i], Disabled: disabled };
    }

    await this.save(items);
    return items;
  }

  async enableWebhooks(indexes?: number[]): Promise<WebHook[]> {
    return this.setWebhooksDisabled(false, indexes);
  }

  async disableWebhooks(indexes?: number[]): Promise<WebHook[]> {
    return this.setWebhooksDisabled(true, indexes);
  }
}
