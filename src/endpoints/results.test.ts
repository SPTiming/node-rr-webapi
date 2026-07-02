import { ParticipantsApi } from './participants';
import { ResultsApi } from './results';
import { bib, pid } from '../types';

describe('ResultsApi', () => {
  const createEventApi = () => ({
    get: jest.fn(),
    post: jest.fn(),
  });

  it('calls results/get with filters', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([]);
    const results = new ResultsApi(eventApi);

    await results.get('PRediction', true, false);

    expect(eventApi.get).toHaveBeenCalledWith('results/get', {
      name: 'PRediction',
      onlyFormulas: true,
      onlyNoFormulas: false,
    });
  });

  it('calls results/save with array body', async () => {
    const eventApi = createEventApi();
    const results = new ResultsApi(eventApi);
    const items = [{ ID: 10001, Name: 'PRediction' }];

    await results.save(items);

    expect(eventApi.post).toHaveBeenCalledWith('results/save', undefined, items);
  });

  it('calls results/delete by id', async () => {
    const eventApi = createEventApi();
    const results = new ResultsApi(eventApi);

    await results.delete(10001);

    expect(eventApi.get).toHaveBeenCalledWith('results/delete', { id: 10001 });
  });
});

describe('ParticipantsApi', () => {
  const createEventApi = () => ({
    get: jest.fn(),
    post: jest.fn(),
  });

  it('calls part/savevaluearray with noHistory', async () => {
    const eventApi = createEventApi();
    const participants = new ParticipantsApi(eventApi);
    const values = [{ PID: 17, FieldName: 'DECIMALTIME10001', Value: 126 }];

    await participants.saveValueArray(values, true);

    expect(eventApi.post).toHaveBeenCalledWith('part/savevaluearray', { noHistory: true }, values);
  });

  it('calls part/savefields for one participant', async () => {
    const eventApi = createEventApi();
    const participants = new ParticipantsApi(eventApi);
    const values = { FirstName: 'John' };

    await participants.saveFields(bib(42), values, false);

    expect(eventApi.post).toHaveBeenCalledWith(
      'part/savefields',
      { bib: 42, noHistory: false },
      values
    );
  });

  it('calls part/delete with identifier and contest', async () => {
    const eventApi = createEventApi();
    const participants = new ParticipantsApi(eventApi);

    await participants.delete('[Bib]=1', pid(17), 2);

    expect(eventApi.get).toHaveBeenCalledWith('part/delete', {
      filter: '[Bib]=1',
      pid: 17,
      contest: 2,
    });
  });

  it('calls part/new with Go parameter order', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue({ ID: 17, Bib: 42 });
    const participants = new ParticipantsApi(eventApi);

    await participants.newParticipant(0, 3, true);

    expect(eventApi.get).toHaveBeenCalledWith('part/new', {
      bib: 0,
      contest: 3,
      firstfree: true,
      v2: true,
    });
  });
});
