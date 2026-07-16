import { SimpleApi, generateSimpleApiKey } from './simpleapi';

describe('SimpleApi', () => {
  const createEventApi = () => ({
    get: jest.fn(),
    post: jest.fn(),
  });

  it('generateSimpleApiKey returns a 32-char uppercase alphanumeric string', () => {
    const key = generateSimpleApiKey();
    expect(key).toHaveLength(32);
    expect(key).toMatch(/^[A-Z0-9]+$/);
  });

  it('get calls simpleapi/get', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([]);
    const simpleApi = new SimpleApi(eventApi);

    await simpleApi.get();

    expect(eventApi.get).toHaveBeenCalledWith('simpleapi/get');
  });

  it('save posts items to simpleapi/save', async () => {
    const eventApi = createEventApi();
    const simpleApi = new SimpleApi(eventApi);
    const items = [{ Key: 'ABC', URL: 'part/savefields', Label: '', Disabled: false }];

    await simpleApi.save(items);

    expect(eventApi.post).toHaveBeenCalledWith('simpleapi/save', undefined, items);
  });

  it('saveAll posts items to simpleapi/saveall', async () => {
    const eventApi = createEventApi();
    const simpleApi = new SimpleApi(eventApi);
    const items = [{ Key: 'ABC', URL: 'part/savefields', Label: '', Disabled: false }];

    await simpleApi.saveAll(items);

    expect(eventApi.post).toHaveBeenCalledWith('simpleapi/saveall', undefined, items);
  });

  it('delete calls simpleapi/delete with key', async () => {
    const eventApi = createEventApi();
    const simpleApi = new SimpleApi(eventApi);

    await simpleApi.delete('MYKEY');

    expect(eventApi.get).toHaveBeenCalledWith('simpleapi/delete', { key: 'MYKEY' });
  });

  it('appendEndpoint fetches existing entries, appends new one, and saveAll full array', async () => {
    const eventApi = createEventApi();
    const existing = [{ Key: 'OLD', URL: 'data/list', Label: 'List', Disabled: false }];
    eventApi.get.mockResolvedValue(existing);
    const simpleApi = new SimpleApi(eventApi);

    const entry = await simpleApi.appendEndpoint({
      url: 'part/savevaluearray',
      label: 'Prediction writer',
      key: 'NEWKEY123456789012345678901234',
    });

    expect(eventApi.get).toHaveBeenCalledWith('simpleapi/get');
    expect(eventApi.post).toHaveBeenCalledWith(
      'simpleapi/saveall',
      undefined,
      [
        ...existing,
        {
          Key: 'NEWKEY123456789012345678901234',
          URL: 'part/savevaluearray',
          Label: 'Prediction writer',
          Disabled: false,
        },
      ]
    );
    expect(entry.URL).toBe('part/savevaluearray');
    expect(entry.Key).toBe('NEWKEY123456789012345678901234');
  });

  it('add delegates to appendEndpoint', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([]);
    const simpleApi = new SimpleApi(eventApi);
    const appendSpy = jest.spyOn(simpleApi, 'appendEndpoint');

    await simpleApi.add({ url: 'rawdata/addmanual', label: 'Test' });

    expect(appendSpy).toHaveBeenCalledWith({ url: 'rawdata/addmanual', label: 'Test' });
  });

  it('disableEndpoints without indexes disables all entries via saveAll', async () => {
    const eventApi = createEventApi();
    const existing = [
      { Key: 'A', URL: 'data/list', Label: 'List', Disabled: false },
      { Key: 'B', URL: 'part/getfields', Label: 'Read', Disabled: false },
    ];
    eventApi.get.mockResolvedValue(existing);
    const simpleApi = new SimpleApi(eventApi);

    const result = await simpleApi.disableEndpoints();

    expect(eventApi.post).toHaveBeenCalledWith(
      'simpleapi/saveall',
      undefined,
      [
        { Key: 'A', URL: 'data/list', Label: 'List', Disabled: true },
        { Key: 'B', URL: 'part/getfields', Label: 'Read', Disabled: true },
      ]
    );
    expect(result.every((item) => item.Disabled)).toBe(true);
  });

  it('enableEndpoints with indexes enables only those entries', async () => {
    const eventApi = createEventApi();
    const existing = [
      { Key: 'A', URL: 'data/list', Label: 'List', Disabled: true },
      { Key: 'B', URL: 'part/getfields', Label: 'Read', Disabled: true },
      { Key: 'C', URL: 'multirequest', Label: 'API', Disabled: true },
    ];
    eventApi.get.mockResolvedValue(existing);
    const simpleApi = new SimpleApi(eventApi);

    const result = await simpleApi.enableEndpoints([1]);

    expect(eventApi.post).toHaveBeenCalledWith(
      'simpleapi/saveall',
      undefined,
      [
        { Key: 'A', URL: 'data/list', Label: 'List', Disabled: true },
        { Key: 'B', URL: 'part/getfields', Label: 'Read', Disabled: false },
        { Key: 'C', URL: 'multirequest', Label: 'API', Disabled: true },
      ]
    );
    expect(result[1].Disabled).toBe(false);
    expect(result[0].Disabled).toBe(true);
    expect(result[2].Disabled).toBe(true);
  });

  it('enableEndpoints throws on out-of-range index', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([
      { Key: 'A', URL: 'data/list', Label: 'List', Disabled: true },
    ]);
    const simpleApi = new SimpleApi(eventApi);

    await expect(simpleApi.enableEndpoints([3])).rejects.toThrow(
      'Index out of range: 3 (list length: 1)'
    );
    expect(eventApi.post).not.toHaveBeenCalled();
  });
});
