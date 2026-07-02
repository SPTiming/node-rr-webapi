import { flattenListRows } from './helpers';
import { ListResponse } from './types';

const fixture: ListResponse = {
  list: { ListName: 'Test List' },
  data: {
    '#1_Contest A': {
      '#1_Group X': [
        ['101', '1', '1.', 'Alice Runner', 'F (1)', 'M30', 'Split1', '1:00:00', '', '', '', 'link', 'C(0,0,0)'],
        ['102', '2', '2.', 'Bob Runner', 'M (1)', 'M30', 'Split1', '1:05:00', '', '', '', 'link', 'C(0,0,0)'],
      ],
      '#2_Group Y': [['103', '3', '3.', 'Carol Runner', 'F (2)', 'M40', 'Split2', '1:10:00', '', '', '', 'link', 'C(255,0,255)']],
    },
  },
  DataFields: [
    'BIB',
    'ID',
    'WithStatus([RANK11.p])',
    'DisplayName',
    'Gender',
    'AgeGroup',
    'LastSplit',
    'Time',
    'Finish',
    'Gap',
    'Col10',
    'RaceGraphLink',
    'Color',
  ],
  mid: 123,
  LiveUpdateInterval: 10,
};

describe('flattenListRows', () => {
  it('flattens nested grouped rows using DataFields', () => {
    const rows = flattenListRows(fixture);

    expect(rows).toHaveLength(3);
    expect(rows[0]._group).toBe("#1_Contest A > #1_Group X");
    expect(rows[0].BIB).toBe('101');
    expect(rows[0].DisplayName).toBe('Alice Runner');
    expect(rows[0].RaceGraphLink).toBe('link');

    expect(rows[2]._group).toBe("#1_Contest A > #2_Group Y");
    expect(rows[2].DisplayName).toBe('Carol Runner');
    expect(rows[2].Color).toBe('C(255,0,255)');
  });

  it('returns empty array when data is empty', () => {
    const rows = flattenListRows({ list: {}, data: {}, DataFields: ['BIB'] });
    expect(rows).toEqual([]);
  });
});
