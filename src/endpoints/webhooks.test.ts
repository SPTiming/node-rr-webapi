import { WebHooksApi } from './webhooks';

describe('WebHooksApi', () => {
  const createEventApi = () => ({
    get: jest.fn(),
    post: jest.fn(),
  });

  const sampleItems = [
    {
      ID: 2,
      Disabled: false,
      Name: 'Trackmium part updated',
      Type: 1,
      URL: 'https://example.com/a',
      Fields: ['BIB', 'FIRSTNAME'],
      Filter: '[CONTEST]=5',
      OrderPos: 1,
    },
    {
      ID: 3,
      Disabled: false,
      Name: 'Trackmium dev',
      Type: 1,
      URL: 'https://example.com/b',
      Fields: ['BIB'],
      Filter: '[CONTEST]=5',
      OrderPos: 2,
    },
  ];

  it('get calls webhooks/get', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([]);
    const webhooks = new WebHooksApi(eventApi);

    await webhooks.get();

    expect(eventApi.get).toHaveBeenCalledWith('webhooks/get');
  });

  it('save posts items to webhooks/save and returns IDs', async () => {
    const eventApi = createEventApi();
    eventApi.post.mockResolvedValue([2, 3]);
    const webhooks = new WebHooksApi(eventApi);

    const ids = await webhooks.save(sampleItems);

    expect(eventApi.post).toHaveBeenCalledWith('webhooks/save', undefined, sampleItems);
    expect(ids).toEqual([2, 3]);
  });

  it('delete calls webhooks/delete with id', async () => {
    const eventApi = createEventApi();
    const webhooks = new WebHooksApi(eventApi);

    await webhooks.delete(3);

    expect(eventApi.get).toHaveBeenCalledWith('webhooks/delete', { id: 3 });
  });

  it('disableWebhooks without indexes disables all entries via save', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue(sampleItems.map((item) => ({ ...item })));
    eventApi.post.mockResolvedValue([2, 3]);
    const webhooks = new WebHooksApi(eventApi);

    const result = await webhooks.disableWebhooks();

    expect(eventApi.post).toHaveBeenCalledWith(
      'webhooks/save',
      undefined,
      [
        { ...sampleItems[0], Disabled: true },
        { ...sampleItems[1], Disabled: true },
      ]
    );
    expect(result.every((item) => item.Disabled)).toBe(true);
  });

  it('enableWebhooks with indexes enables only those entries', async () => {
    const eventApi = createEventApi();
    const existing = sampleItems.map((item) => ({ ...item, Disabled: true }));
    eventApi.get.mockResolvedValue(existing);
    eventApi.post.mockResolvedValue([2, 3]);
    const webhooks = new WebHooksApi(eventApi);

    const result = await webhooks.enableWebhooks([1]);

    expect(eventApi.post).toHaveBeenCalledWith(
      'webhooks/save',
      undefined,
      [
        { ...sampleItems[0], Disabled: true },
        { ...sampleItems[1], Disabled: false },
      ]
    );
    expect(result[1].Disabled).toBe(false);
    expect(result[0].Disabled).toBe(true);
  });

  it('enableWebhooks throws on out-of-range index', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([{ ...sampleItems[0], Disabled: true }]);
    const webhooks = new WebHooksApi(eventApi);

    await expect(webhooks.enableWebhooks([3])).rejects.toThrow(
      'Index out of range: 3 (list length: 1)'
    );
    expect(eventApi.post).not.toHaveBeenCalled();
  });
});
