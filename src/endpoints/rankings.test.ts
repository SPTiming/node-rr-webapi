import { RankingsApi } from './rankings';

describe('RankingsApi', () => {
  const createEventApi = () => ({
    get: jest.fn(),
    post: jest.fn(),
  });

  const sampleItems = [
    {
      ID: 1,
      Name: 'OverallRank',
      Group: ['CONTEST', '', '', ''],
      Sort: ['{LastSplit}.OrderPos', '{LastSplit}.GUN', '', ''],
      SortDesc: [true, false, false, false],
      UseTies: true,
      ContestSort: false,
      Filter: '[STATUS]=0 AND [{LastSplit}.OrderPos] > 0',
      GroupName: '',
    },
    {
      ID: 2,
      Name: 'GenderRank',
      Group: ['CONTEST', 'SEX', '', ''],
      Sort: ['{LastSplit}.OrderPos', '{LastSplit}.GUN', '', ''],
      SortDesc: [true, false, false, false],
      UseTies: true,
      ContestSort: false,
      Filter: '[STATUS]=0 AND [{LastSplit}.OrderPos] > 0',
      GroupName: '',
    },
  ];

  it('get calls ranks/get', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([]);
    const rankings = new RankingsApi(eventApi);

    await rankings.get();

    expect(eventApi.get).toHaveBeenCalledWith('ranks/get');
  });

  it('getOne calls ranks/get with id', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue(sampleItems[0]);
    const rankings = new RankingsApi(eventApi);

    const result = await rankings.getOne(1);

    expect(eventApi.get).toHaveBeenCalledWith('ranks/get', { id: 1 });
    expect(result).toEqual(sampleItems[0]);
  });

  it('delete calls ranks/delete with id', async () => {
    const eventApi = createEventApi();
    const rankings = new RankingsApi(eventApi);

    await rankings.delete(2);

    expect(eventApi.get).toHaveBeenCalledWith('ranks/delete', { id: 2 });
  });

  it('save posts items to ranks/save and returns IDs', async () => {
    const eventApi = createEventApi();
    eventApi.post.mockResolvedValue([1, 2]);
    const rankings = new RankingsApi(eventApi);

    const ids = await rankings.save(sampleItems);

    expect(eventApi.post).toHaveBeenCalledWith('ranks/save', undefined, sampleItems);
    expect(ids).toEqual([1, 2]);
  });
});
