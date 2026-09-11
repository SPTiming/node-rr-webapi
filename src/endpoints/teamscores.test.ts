import { TeamScoresApi } from './teamscores';

describe('TeamScoresApi', () => {
  const createEventApi = () => ({
    get: jest.fn(),
    post: jest.fn(),
  });

  const sampleItems = [
    {
      ID: 1,
      Name: 'Team Overall',
      ResultID1: 10001,
      ResultID2: 0,
      ResultID3: 0,
      ResultID4: 0,
      ResultMode1: 0,
      ResultMode2: 0,
      ResultMode3: 0,
      ResultMode4: 0,
      SortDesc1: false,
      SortDesc2: false,
      SortDesc3: false,
      RealTime: false,
      MinTotal: 3,
      MaxTotal: 5,
      MinFemale: 0,
      MaxFemale: 0,
      MaxTeams: 0,
      Filter: '[CONTEST]=1',
      TimeFormat: '',
      LapTimes: 0,
      LapTimesLemans: false,
      LapTimesZeroStart: false,
      LapModeLocation: '',
      TeamSort: '',
      Assigning1: '',
      Grouping1: '',
      Assigning2: '',
      Grouping2: '',
      Assigning3: '',
      Grouping3: '',
      Assigning4: '',
      Grouping4: '',
      UseTies: false,
      LapTimesSubtractT0: false,
      LapTimesCountLemansAsLap: false,
      LapTimesPenaltyTimeResult: 0,
      LapTimesPenaltyLapsResult: 0,
      LapTimesMinLapTime: 0,
      LapTimesIgnoreBefore: 0,
      LapTimesIgnoreAfter: 0,
    },
    {
      ID: 2,
      Name: 'Team Gender',
      ResultID1: 10002,
      ResultID2: 0,
      ResultID3: 0,
      ResultID4: 0,
      ResultMode1: 0,
      ResultMode2: 0,
      ResultMode3: 0,
      ResultMode4: 0,
      SortDesc1: false,
      SortDesc2: false,
      SortDesc3: false,
      RealTime: false,
      MinTotal: 3,
      MaxTotal: 5,
      MinFemale: 1,
      MaxFemale: 2,
      MaxTeams: 0,
      Filter: '[CONTEST]=1',
      TimeFormat: '',
      LapTimes: 0,
      LapTimesLemans: false,
      LapTimesZeroStart: false,
      LapModeLocation: '',
      TeamSort: '',
      Assigning1: '',
      Grouping1: '',
      Assigning2: '',
      Grouping2: '',
      Assigning3: '',
      Grouping3: '',
      Assigning4: '',
      Grouping4: '',
      UseTies: false,
      LapTimesSubtractT0: false,
      LapTimesCountLemansAsLap: false,
      LapTimesPenaltyTimeResult: 0,
      LapTimesPenaltyLapsResult: 0,
      LapTimesMinLapTime: 0,
      LapTimesIgnoreBefore: 0,
      LapTimesIgnoreAfter: 0,
    },
  ];

  it('get calls teamscores/get', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue(sampleItems);
    const teamScores = new TeamScoresApi(eventApi);

    const result = await teamScores.get();

    expect(eventApi.get).toHaveBeenCalledWith('teamscores/get');
    expect(result).toEqual(sampleItems);
  });

  it('getOne calls teamscores/get with id and returns the first item', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([sampleItems[1]]);
    const teamScores = new TeamScoresApi(eventApi);

    const result = await teamScores.getOne(2);

    expect(eventApi.get).toHaveBeenCalledWith('teamscores/get', { id: 2 });
    expect(result).toEqual(sampleItems[1]);
  });

  it('getOne throws when the array is empty', async () => {
    const eventApi = createEventApi();
    eventApi.get.mockResolvedValue([]);
    const teamScores = new TeamScoresApi(eventApi);

    await expect(teamScores.getOne(99)).rejects.toThrow('team score not found');
  });

  it('delete calls teamscores/delete with id', async () => {
    const eventApi = createEventApi();
    const teamScores = new TeamScoresApi(eventApi);

    await teamScores.delete(2);

    expect(eventApi.get).toHaveBeenCalledWith('teamscores/delete', { id: 2 });
  });

  it('save posts a single item to teamscores/save', async () => {
    const eventApi = createEventApi();
    eventApi.post.mockResolvedValue(undefined);
    const teamScores = new TeamScoresApi(eventApi);

    await teamScores.save(sampleItems[0]);

    expect(eventApi.post).toHaveBeenCalledWith(
      'teamscores/save',
      undefined,
      sampleItems[0]
    );
  });
});
